import React from "react";
import { Heading } from "@/components/ui/heading";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { UpdateAssignment } from "./update";
import { getAssignmentById } from "@/data/assignments";

import { Separator } from "@/components/ui/separator";
import NotFound from "@/app/not-found";
import { CreateQuizForm } from "./add-quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeQuestionForm from "./add-code-question";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  {
    title: "Assignments",
    href: "/admin/assignments",
    disabled: false,
    type: "link",
  },
  {
    title: "Manage",
    disabled: false,
    type: "text",
  },
];

export default async function Page(props: {
  params: Promise<{ assignment: string }>;
}) {
  const params = await props.params;
  const assignment = await getAssignmentById(params.assignment);
  if (!assignment) return NotFound();
  return (
    <div>
      <div className="flex-1 space-y-4 p-5">
        <BreadcrumbMaker items={breadcrumbItems} />
        <div className="flex flex-col items-start justify-between max-sm:space-y-4 md:flex-row">
          <Heading
            title={assignment.title}
            description={assignment.description}
          />
          <UpdateAssignment assignment={assignment} />
        </div>
        <Separator />
        {assignment.quizzes.map((q) => (
          <div key={q.id}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {q.questions.map((question) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle>{question.content}</CardTitle>
                    <CardDescription>
                      Correct Answer : {question.correctOption}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {question.options.map((o, index) => (
                      <p key={index}>
                        option {index + 1} : <span className="">{o}</span>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignment.codeQuestions.map((q) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle>{q.description}</CardTitle>
                <CardDescription>Constraints : {q.constraints}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Example Input : {q.exampleInput}</p>
                <p>Example Ouput : {q.exampleOutput}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {assignment.codeQuestions.length > 0 && <Separator className="my-4" />}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full">
          <CreateQuizForm assignmentId={params.assignment} />
          <CodeQuestionForm assignmentId={params.assignment}/>
        </div>
      </div>
    </div>
  );
}
