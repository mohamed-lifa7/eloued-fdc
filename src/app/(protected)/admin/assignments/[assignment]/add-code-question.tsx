"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CodeQuestionSchema } from "@/schemas";
import { useForm, Controller } from "react-hook-form";
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
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Difficulty } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

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
      maxScore: 25,
      difficulty: Difficulty.EASY,
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
            form.reset();
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
          <CardContent className="flex flex-col justify-between space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Code Question Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Score</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Difficulty.EASY}>Easy</SelectItem>
                        <SelectItem value={Difficulty.MEDIUM}>
                          Medium
                        </SelectItem>
                        <SelectItem value={Difficulty.HARD}>Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field }) => (
                        <QuillEditor
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          modules={{
                            syntax: { hljs },
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                              ],
                              [{ list: "ordered" }, { list: "bullet" }],
                              ["link", "code-block", "code"],
                              ["clean"],
                            ],
                          }}
                          className="min-h-[200px]"
                        />
                      )}
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
