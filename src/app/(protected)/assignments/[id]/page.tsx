import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { getAssignmentById } from "@/data/assignments";
import { notFound } from "next/navigation";
import QuizPage from "./questions";
import { isCodeQuestionSubmitted, isSubmitted } from "@/data/answers";
import { currentUser } from "@/server/auth";
import CodeQuestionPage from "./code-questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";

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
          const submitted = await isSubmitted({
            quizId: q.id,
            userId: crntUser.id!,
          });
          return (
            <QuizPage
              questions={q.questions}
              key={q.id}
              quizId={q.id}
              disabled={submitted}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="mt-8 w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code2 className="mr-2" />
            Coding Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Read the problem statement carefully and understand all requirements.</li>
            <li>Consider edge cases and handle them in your solution.</li>
            <li>Optimize your code for better performance when possible.</li>
            <li>Use meaningful variable names and add comments for clarity.</li>
            <li>Test your code with various inputs, including the provided example.</li>
          </ul>
        </CardContent>
      </Card>
        {assignment.codeQuestions.map(async (q, index) => {
          const submitted = await isCodeQuestionSubmitted({
            codeQuestionId: q.id,
            userId: crntUser.id!,
          });
          return (
            <CodeQuestionPage disabled={submitted} key={q.id} question={q} index={index + 1}/>
          );
        })}
      </div>
    </div>
  );
}
