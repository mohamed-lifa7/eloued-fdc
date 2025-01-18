import { getCodeQuestionById } from "@/data/quizes";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RenderDOMPurify from "@/components/render-dompurify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import EnhancedCodeQuestionPage from "../code-questions";
import { getSubmittedCodeQuestion } from "@/data/answers";

const page = async (props: { params: Promise<{ question: string }> }) => {
  const questionId = (await props.params).question;
  const question = await getCodeQuestionById(questionId);
  if (!question) return notFound();
  const answer = await getSubmittedCodeQuestion({
    codeQuestionId: question.id,
  });
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
        {/* Instructions Panel */}
        <Card className="bg-card p-6 text-card-foreground">
          <ScrollArea className="h-[70vh]">
            <CardHeader>
              <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <RenderDOMPurify content={question.description} />
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Code Editor Panel */}
        <div className="relative">
          <EnhancedCodeQuestionPage question={question} answer={answer} />
        </div>
      </div>
    </div>
  );
};

export default page;
