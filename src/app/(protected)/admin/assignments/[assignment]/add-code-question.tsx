"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CodeQuestionSchema } from "@/schemas";
import { createCodeQuestion } from "@/actions/questions";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddCodeQuestion({ assignmentId }: { assignmentId: string }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const closeModal = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="primary2">Add Code Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Code Question</DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new code question.
            </DialogDescription>
          </DialogHeader>
          <AddQuestionForm
            assignmentId={assignmentId}
            closeModal={closeModal}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="primary2">Add Code Question</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Code Question</DrawerTitle>
          <DrawerDescription>
            Fill out the details below to create a new code question.
          </DrawerDescription>
        </DrawerHeader>
        <AddQuestionForm assignmentId={assignmentId} closeModal={closeModal} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddQuestionForm({
  assignmentId,
  closeModal,
}: {
  assignmentId: string;
  closeModal: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CodeQuestionSchema>>({
    resolver: zodResolver(CodeQuestionSchema),
    defaultValues: {
      assignmentId,
    },
  });

  const onSubmit = (data: z.infer<typeof CodeQuestionSchema>) => {
    startTransition(() => {
      createCodeQuestion(data)
        .then((result) => {
          if (result.error) {
            toast.error(result.error);
          }

          if (result.success) {
            toast.success(result.success);
            closeModal(); // Close the modal on success
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <ScrollArea className="h-5/6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-96 space-y-8 px-4"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the question content"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="constraints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Constraints</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the question constraints"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exampleInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Input</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exampleOutput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Output</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
