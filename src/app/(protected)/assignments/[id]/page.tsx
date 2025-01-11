import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { getAssignmentById } from "@/data/assignments";
import { notFound } from "next/navigation";
import QuizPage from "./questions";
import { getSubmittedAnswer, getSubmittedCodeQuestion } from "@/data/answers";
import { currentUser } from "@/server/auth";
import CodeQuestionPage from "./code-questions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock, Code2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const breadcrumbItems = (slug: string): BreadcrumbType[] => [
  { title: "Home", href: "/", disabled: false, type: "link" },
  { title: "Assignments", href: "/assignments", disabled: false, type: "link" },
  { title: slug, disabled: true, type: "text" },
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const assignment = await getAssignmentById(id);
  const crntUser = await currentUser();
  if (!crntUser || !assignment) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex-1 space-y-4">
        <BreadcrumbMaker items={breadcrumbItems(assignment.title)} />
        <Heading
          title={assignment.title}
          description={assignment.description}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignment.quizzes.map(async (q) => {
          const answer = await getSubmittedAnswer({
            quizId: q.id,
            userId: crntUser.id!,
          });
          if (!answer) {
            return (
              <QuizPage questions={q.questions} key={q.id} quizId={q.id} />
            );
          } else {
            const maxScore = q.questions.length * 5;
            const scorePercentage = (answer.score / maxScore) * 100;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(answer.createdAt);
            return (
              <Card
                className="mx-auto flex w-full max-w-lg flex-col justify-between overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
                key={q.id}
              >
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Submitted Questions
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="rounded-md border bg-secondary/10 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Score:</span>
                      <span className="text-2xl font-bold">
                        {answer.score} / {maxScore}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress value={scorePercentage} className="w-full" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{scorePercentage.toFixed(1)}% of max score</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium">
                      {scorePercentage >= 80
                        ? "Excellent job!"
                        : scorePercentage >= 60
                          ? "Good effort!"
                          : "Keep practicing!"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Submitted on:</span>
                  </div>
                  <time dateTime={answer.createdAt.toISOString()}>
                    {formattedDate}
                  </time>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="mx-auto mt-8 w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code2 className="mr-2" />
              Coding Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Read the problem statement carefully and understand all
                requirements.
              </li>
              <li>Consider edge cases and handle them in your solution.</li>
              <li>Optimize your code for better performance when possible.</li>
              <li>
                Use meaningful variable names and add comments for clarity.
              </li>
              <li>
                Test your code with various inputs, including the provided
                example.
              </li>
            </ul>
          </CardContent>
        </Card>
        {assignment.codeQuestions.map(async (q, index) => {
          const answer = await getSubmittedCodeQuestion({
            codeQuestionId: q.id,
            userId: crntUser.id!,
          });
          if (answer) {
            const maxScore = q.maxScore;
            const scorePercentage = ((answer.score ?? 0) / maxScore) * 100;
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(answer.submittedAt);
            return (
              <Card
                className="mx-auto flex w-full max-w-lg flex-col justify-between overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
                key={q.id}
              >
                <CardHeader className="bg-primary-2 text-primary-foreground">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Submitted Questions
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {q.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="rounded-md border bg-secondary/10 p-4 space-y-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Score:</span>
                      <span className="text-2xl font-bold">
                        {answer.score} / {maxScore}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress value={scorePercentage} className="w-full" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{scorePercentage.toFixed(1)}% of max score</p>
                      </TooltipContent>
                    </Tooltip>
                    <p>
                      <span className="font-bold">result</span> : {answer.result}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium">
                      {scorePercentage >= 80
                        ? "Excellent job!"
                        : scorePercentage >= 60
                          ? "Good effort!"
                          : "Keep practicing!"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Submitted on:</span>
                  </div>
                  <time dateTime={answer.submittedAt.toISOString()}>
                    {formattedDate}
                  </time>
                </CardFooter>
              </Card>
            );
          } else {
            return (
              <CodeQuestionPage
                answer={answer}
                key={q.id}
                question={q}
                index={index + 1}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
