"use client";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { UpdateAssignmentSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { type Assignment } from "@prisma/client";
import { updateAssignment } from "@/actions/assignments";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export function UpdateAssignment({ assignment }: { assignment: Assignment }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const closeModal = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Update Assignment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Assignment</DialogTitle>
            <DialogDescription>
              Update assignment details such as title, description and type.
            </DialogDescription>
          </DialogHeader>
          <UpdateAssignmentForm
            assignment={assignment}
            closeModal={closeModal}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Update Assignment</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Assignment</DrawerTitle>
          <DrawerDescription>
            Update assignment details such as title, description and type.
          </DrawerDescription>
        </DrawerHeader>
        <UpdateAssignmentForm assignment={assignment} closeModal={closeModal} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
const UpdateAssignmentForm = ({
  assignment,
  closeModal,
}: {
  assignment: Assignment;
  closeModal: () => void;
}) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateAssignmentSchema>>({
    resolver: zodResolver(UpdateAssignmentSchema),
    defaultValues: {
      title: assignment?.title ?? undefined,
      description: assignment?.description ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateAssignmentSchema>) => {
    startTransition(() => {
      updateAssignment(assignment?.id ?? "", values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            closeModal();
          }
        })
        .catch(() => {
          setError("Something went wrong! - Try again");
          closeModal();
        });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Description"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAssignmentForm;
