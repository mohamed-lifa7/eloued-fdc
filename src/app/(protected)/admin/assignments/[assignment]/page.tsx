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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeQuestionForm from "./add-code-question";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@prisma/client";
import { Calendar, Trophy } from "lucide-react";
import { DeleteCodeQuestion } from "./delete-code-question";
import { DeleteQuiz } from "./delete-quiz";

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignment.codeQuestions.map((q) => (
            <Card
              className="w-full max-w-sm transition-all duration-300 hover:shadow-lg"
              key={q.id}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{q.title}</CardTitle>
                  <Badge
                    variant={
                      q.difficulty == Difficulty.EASY
                        ? "success"
                        : q.difficulty == Difficulty.HARD
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {q.difficulty}
                  </Badge>
                </div>
                <CardDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(q.createdAt)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{q.maxScore}</span>
                    <span className="text-sm text-muted-foreground">
                      Max score
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="primary2" asChild>
                  <Link href={`/admin/assignments/${q.assignmentId}/${q.id}`}>
                    view submitions
                  </Link>
                </Button>
                <DeleteCodeQuestion id={q.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignment.quizzes.map((q) => (
            <Card
              className="w-full max-w-sm transition-all duration-300 hover:shadow-lg"
              key={q.id}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">
                    Quiz ID: {q.id}
                  </CardTitle>
                </div>
                <CardDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(q.createdAt)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-bold text-primary">Questions:</p>
                  {q.questions.map((question, index) => (
                    <p
                      key={question.id}
                      className="ml-4 list-disc text-sm text-muted-foreground"
                    >
                      <span className="font-bold text-foreground">
                        {index + 1}.
                      </span>{" "}
                      {question.content}
                    </p>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <DeleteQuiz id={q.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        {assignment.codeQuestions.length > 0 && <Separator className="my-4" />}
        <div className="space-y-4">
          <CreateQuizForm assignmentId={params.assignment} />
          <CodeQuestionForm assignmentId={params.assignment} />
        </div>
      </div>
    </div>
  );
}
