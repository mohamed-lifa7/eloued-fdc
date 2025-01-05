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
import { useForm, useFieldArray } from "react-hook-form";
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
import { QuestionSchema } from "@/schemas";
import { createQuestion } from "@/actions/questions";
import { toast } from "sonner";

export function AddQuestion({ assignmentId }: { assignmentId: string }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const closeModal = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new question.
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
        <Button>Add Question</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Question</DrawerTitle>
          <DrawerDescription>
            Fill out the details below to create a new question.
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
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      content: "",
      options: ["", "", "", ""], // Default to 4 empty options
      correctOption: 0,
      assignmentId,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options" as unknown as never
  });

  const onSubmit = (data: z.infer<typeof QuestionSchema>) => {
    startTransition(() => {
      createQuestion(data)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            closeModal(); // Close the drawer or dialog on success
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
        <FormField
          control={form.control}
          name="content"
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

        <div className="flex flex-col space-y-4">
          <FormLabel>Options</FormLabel>
          {fields.map((option, index) => (
            <FormItem key={option.id}>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    {...form.register(`options.${index}`)}
                    disabled={isPending}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 2 || isPending} // Ensure at least 2 options
                >
                  Remove
                </Button>
              </div>
            </FormItem>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append("")}
            disabled={isPending}
          >
            Add Option
          </Button>
        </div>

        <FormField
          control={form.control}
          name="correctOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Option</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the correct option index (e.g., 0, 1, 2, ...)"
                  {...field}
                  disabled={isPending}
                />
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
  );
}
