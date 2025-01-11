"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CodeQuestionSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { createCodeQuestion } from "@/actions/quizzes";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export default function CodeQuestionForm({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CodeQuestionSchema>>({
    resolver: zodResolver(CodeQuestionSchema),
    defaultValues: {
      assignmentId,
    },
  });

  const onSubmit = (values: z.infer<typeof CodeQuestionSchema>) => {
    startTransition(() => {
      createCodeQuestion(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error(data.error);
        }
        
        if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            form.reset()
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Submit Code Question</CardTitle>
            <CardDescription>
              Create a new coding challenge for assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a detailed description of the coding challenge"
                      className="min-h-[100px]"
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
                    <Input
                      {...field}
                      placeholder="Provide an example input"
                      disabled={isPending}
                    />
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
                    <Input
                      {...field}
                      placeholder="Provide the expected output for the example input"
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
                  <FormLabel>Constraints (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add any constraints or limitations for the challenge"
                      className="min-h-[80px]"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Submitting..." : "Submit Code Question"}
            </Button>
          </CardContent>

          <CardFooter>
            <FormError message={error} />
            <FormSuccess message={success} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
