"use client";

import { useState } from "react";
import type { CodeQuestion, CodeSubmission } from "@prisma/client";
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
  FormMessage,
} from "@/components/ui/form";
import Controlled from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { javascript, typescriptLanguage } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSubmissionSchema } from "@/schemas";
import { useTransition } from "react";
import { submitCodeQuestionAnswer } from "@/actions/answers";
import { toast } from "sonner";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Code2,
  Trophy,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function EnhancedCodeQuestionPage({
  question,
  answer,
}: {
  question: CodeQuestion;
  answer: CodeSubmission | null;
}) {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CodeSubmissionSchema>>({
    resolver: zodResolver(CodeSubmissionSchema),
    defaultValues: {
      code: "",
      codeQuestionId: question.id,
      result: "",
      score: 0,
      userId: "",
    },
  });

  function onSubmit(values: z.infer<typeof CodeSubmissionSchema>) {
    startTransition(() => {
      submitCodeQuestionAnswer(values)
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

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    form.setValue("code", ""); // Reset code when changing language
  };

  if (answer) {
    // if there is answer we would display that you have already submitted an answer and show him his answer
    return (
      <Card className="mx-auto w-full max-w-4xl overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Submission Status</CardTitle>
              <CardDescription>
                You have already submitted an answer for this challenge
              </CardDescription>
            </div>
            <Badge variant={answer.score !== 0 ? "success" : "secondary"}>
              {answer.score !== 0 ? "Reviewed" : "Pending Review"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Section */}
          {answer.score !== 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Score</p>
              </div>
              <p className="text-2xl font-bold">{answer.score}</p>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Submitted</p>
            </div>
            <p className="text-sm">
              {answer.submittedAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Language</p>
            </div>
            <p className="text-sm">C++</p>
          </div>
          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Solution</h3>
              <Badge variant="outline">Read Only</Badge>
            </div>
            <Controlled
              theme={theme === "dark" ? "dark" : "light"}
              extensions={[cpp()]}
              className="rounded-md border bg-muted/50"
              height="300px"
              value={answer.code}
              readOnly
            />
          </div>

          {/* Review Status */}
          {answer.result && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Review Comments</h3>
                <p className="text-sm text-muted-foreground">
                  {answer.result ||
                    "Not reviewed yet. Please wait until the admin reviews your submission."}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mx-auto w-full max-w-4xl overflow-hidden">
            <CardContent className="space-y-6">
              <Separator />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Solution</FormLabel>
                    <Tabs
                      value={selectedLanguage}
                      onValueChange={handleLanguageChange}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="cpp" disabled={isPending}>
                          C++
                        </TabsTrigger>
                        {/* <TabsTrigger value="py" disabled={isPending}> */}
                        <TabsTrigger value="py" disabled={true}>
                          Python
                        </TabsTrigger>
                        {/* <TabsTrigger value="js" disabled={isPending}> */}
                        <TabsTrigger value="js" disabled={true}>
                          JavaScript
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="py">
                        <FormControl>
                          <Controlled
                            {...field}
                            theme={theme === "dark" ? "dark" : "light"}
                            extensions={[python()]}
                            className="mt-4 rounded-md border"
                            height="300px"
                            readOnly={isPending}
                          />
                        </FormControl>
                      </TabsContent>
                      <TabsContent value="cpp">
                        <FormControl>
                          <Controlled
                            {...field}
                            theme={theme === "dark" ? "dark" : "light"}
                            extensions={[cpp()]}
                            className="mt-4 rounded-md border"
                            height="300px"
                            readOnly={isPending}
                          />
                        </FormControl>
                      </TabsContent>
                      <TabsContent value="js">
                        <FormControl>
                          <Controlled
                            {...field}
                            theme={theme === "dark" ? "dark" : "light"}
                            extensions={[javascript(), typescriptLanguage]}
                            className="mt-4 rounded-md border"
                            height="300px"
                            readOnly={isPending}
                          />
                        </FormControl>
                      </TabsContent>
                    </Tabs>
                    <FormDescription>
                      Write your solution in the selected programming language.
                      Test your code thoroughly before submitting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-6">
              {!showSuccessMessage && (
                <Alert variant="warning" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Editing submissions later may not be possible.
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Submitting..." : "Submit Solution"}
              </Button>
              {showSuccessMessage && (
                <Alert variant="success" className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your solution has been submitted successfully!
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    );
  }
}
