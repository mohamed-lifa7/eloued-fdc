"use client";

import { useState } from "react";
import type { CodeSubmission } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Controlled from "@uiw/react-codemirror";
import { cpp, cppLanguage } from "@codemirror/lang-cpp";
import { useTheme } from "next-themes";
import { CodeSubmissionSchema } from "@/schemas";
import { useTransition } from "react";
import { ReviewSubmit } from "@/actions/answers";
import { toast } from "sonner";
import { CheckCircle2, Code, ThumbsUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export default function ReviewSubmission({
  answer,
}: {
  answer: CodeSubmission | null;
}) {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CodeSubmissionSchema>>({
    resolver: zodResolver(CodeSubmissionSchema),
    defaultValues: {
      code: answer?.code ?? "",
      codeQuestionId: answer?.codeQuestionId ?? "",
      result: answer?.result ?? "",
      score: answer?.score ?? 0,
      userId: answer?.userId ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof CodeSubmissionSchema>) {
    startTransition(() => {
      ReviewSubmit(values, answer?.id)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            setShowSuccessMessage(true);
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  if ((answer?.score ?? 0) > 0) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="text-green-500" />
            Submission Already Reviewed
          </CardTitle>
          <CardDescription>
            This submission has already been scored and cannot be reviewed
            again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Score: {answer?.score}</p>
          <p className="mt-2">Result: {answer?.result}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="text-primary" />
          Review Code Submission
        </CardTitle>
        <CardDescription>
          Evaluate the submitted code and provide feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submitted Solution</FormLabel>
                  <FormControl>
                    <Controlled
                      {...field}
                      theme={theme === "dark" ? "dark" : "light"}
                      extensions={[cpp(), cppLanguage]}
                      className="mt-2 rounded-md border"
                      height="300px"
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    Review the submitted code carefully.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={25}
                      step={1}
                      value={[field.value!]}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <Badge
                    variant={
                      field.value == 25
                        ? "success"
                        : field.value! > 10
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {field.value}
                  </Badge>
                  <FormDescription>
                    Assign a score from 0 to 100 based on the code quality and
                    correctness.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed feedback on the submission..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Offer constructive feedback to help the submitter improve.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Submitting Review..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {showSuccessMessage && (
          <Alert variant="default" className="mt-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your review has been submitted successfully!
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
