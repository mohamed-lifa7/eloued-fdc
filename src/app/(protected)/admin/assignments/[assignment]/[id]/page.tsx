import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCodeQuestionWithAnswers } from "@/data/answers";
import ReviewSubmission from "./review-form";
import { Code, Clock, Users, AlertTriangle } from 'lucide-react';
import Link from "next/link";

const EnhancedCodeQuestionPage = async ({ params }: { params: { id: string } }) => {
  const codeQuestion = await getCodeQuestionWithAnswers(params.id);

  if (!codeQuestion) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Question Not Found</h2>
            <p className="text-muted-foreground">The requested code question could not be found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const submissionCount = codeQuestion.submissions.length;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold mb-2 flex items-center">
                <Code className="mr-2" />
                Code Question
              </CardTitle>
              <p className="text-muted-foreground">ID: {codeQuestion.id}</p>
            </div>
            <Badge variant="outline" className="text-sm">
              Max Score: {codeQuestion.maxScore}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p>{codeQuestion.description}</p>
          </div>
          {codeQuestion.constraints && (
            <div>
              <h3 className="font-semibold mb-2">Constraints:</h3>
              <p>{codeQuestion.constraints}</p>
            </div>
          )}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="example">
              <AccordionTrigger>View Example</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Example Input:</h3>
                    <pre className="rounded-md bg-muted p-2 overflow-x-auto">
                      {codeQuestion.exampleInput}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Example Output:</h3>
                    <pre className="rounded-md bg-muted p-2 overflow-x-auto">
                      {codeQuestion.exampleOutput}
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Created: {codeQuestion.createdAt.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Submissions: {submissionCount}
          </div>
        </CardFooter>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Submissions</h2>
        {codeQuestion.submissions.length > 0 ? (
          codeQuestion.submissions.map((answer) => (
            <ReviewSubmission answer={answer} key={answer.id} />
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No submissions yet.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">
          <Link href={`/admin/assignments/${codeQuestion.assignmentId}`}>
          Back to Assignments
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCodeQuestionPage;