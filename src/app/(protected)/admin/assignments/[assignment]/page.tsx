import React from "react";
import { Heading } from "@/components/ui/heading";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateAssignment } from "./update";
import { getAssignmentById } from "@/data/assignments";
import { AddQuestion } from "./add-question";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddCodeQuestion } from "./add-code-question";
import NotFound from "@/app/not-found";

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
  if(!assignment) return NotFound()
  return (
    <ScrollArea className="h-screen">
      <div className="flex-1 space-y-4 p-5">
        <BreadcrumbMaker items={breadcrumbItems} />
        <div className="flex flex-col items-start justify-between max-sm:space-y-4 md:flex-row">
          <Heading
            title="Manage Assignment"
            description="Manage assignment, update assignment, create new question and test casesk."
          />
          <UpdateAssignment assignment={assignment} />
        </div>
        <div className="flex items-center space-x-2">
          <AddQuestion assignmentId={params.assignment} />
          <AddCodeQuestion assignmentId={params.assignment} />
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignment?.questions.map((q, index) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle>Question number {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold">Question content:</h4>
                  <p>{q.content}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Correct answer:</h4>
                  <p>{q.correctOption}</p>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex-col items-start justify-between space-y-2 p-2">
                <h4 className="text-lg font-bold">Options:</h4>
                {q.options.map((option, index) => (
                  <p
                    key={index}
                    className="w-full rounded-md border border-input bg-background p-2 text-sm font-medium shadow-sm transition-colors"
                  >
                    {option}
                  </p>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignment?.codeQuestions.map((q, index) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle>Question number {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold">Question content:</h4>
                  <p>{q.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Constraints:</h4>
                  <p>{q.constraints}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Example Input:</h4>
                  <p>{q.exampleOutput}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Example Output:</h4>
                  <p>{q.exampleOutput}</p>
                </div>
              </CardContent>
              <Separator />
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
