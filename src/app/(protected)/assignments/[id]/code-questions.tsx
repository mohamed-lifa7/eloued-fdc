"use client";

import { useState } from "react";
import type { CodeQuestion } from "@prisma/client";
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
import { javascript, typescriptLanguage } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
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
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function EnhancedCodeQuestionPage({
  question,
  disabled,
  index,
}: {
  question: CodeQuestion;
  disabled: boolean;
  index: number;
}) {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    form.setValue("code", ""); // Reset code when changing language
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto w-full max-w-4xl overflow-hidden">
          <CardHeader className="bg-primary-2 text-primary-foreground">
            <CardTitle className="text-xl">Challenge N: {index}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="my-4">
              <CardDescription className="text-foreground">
                {question.description}
              </CardDescription>
              <CardDescription>{question.constraints}</CardDescription>
            </div>
            <Separator />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="example">
                <AccordionTrigger>View Example</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Example Input:</h3>
                      <pre className="rounded-md bg-muted p-2">
                        {question.exampleInput}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Example Output:</h3>
                      <pre className="rounded-md bg-muted p-2">
                        {question.exampleOutput}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
                      <TabsTrigger value="cpp" disabled={isPending || disabled}>
                        C++
                      </TabsTrigger>
                      <TabsTrigger value="py" disabled={isPending || disabled}>
                        Python
                      </TabsTrigger>
                      <TabsTrigger value="js" disabled={isPending || disabled}>
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
                          readOnly={isPending || disabled}
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
                          readOnly={isPending || disabled}
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
                          readOnly={isPending || disabled}
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
              <Alert variant="warning" className="w-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Editing submissions later may not be possible.
                </AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              disabled={disabled || isPending}
              className="w-full"
            >
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
