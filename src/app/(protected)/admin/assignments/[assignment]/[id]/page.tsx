import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCodeQuestionWithAnswers } from "@/data/answers";
import ReviewSubmission from "./review-form";
import { Code, Clock, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import RenderDOMPurify from "@/components/render-dompurify";

const EnhancedCodeQuestionPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const codeQuestion = await getCodeQuestionWithAnswers(params.id);

  if (!codeQuestion) {
    return (
      <Card className="mx-auto mt-8 max-w-2xl">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertTriangle className="mb-4 h-12 w-12 text-yellow-500" />
            <h2 className="mb-2 text-2xl font-bold">Question Not Found</h2>
            <p className="text-muted-foreground">
              The requested code question could not be found.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const submissionCount = codeQuestion.submissions.length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="mb-2 flex items-center text-2xl font-bold">
                <Code className="mr-2" />
                {codeQuestion.title}
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
            <h3 className="mb-2 font-semibold">Description:</h3>
            {/* <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize() }} /> */}
            <RenderDOMPurify content={codeQuestion.description} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Created: {codeQuestion.createdAt.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
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
              <p className="text-center text-muted-foreground">
                No submissions yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8 flex justify-center">
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
