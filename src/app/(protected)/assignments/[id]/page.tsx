import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getAssignmentById } from "@/data/assignments";
import { notFound } from "next/navigation";

const breadcrumbItems = (slug: string): BreadcrumbType[] => [
  { title: "Home", href: "/", disabled: false, type: "link" },
  { title: "Assignments", href: "/assignments", disabled: false, type: "link" },
  { title: slug, disabled: true, type: "text" },
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const assignment = await getAssignmentById(id);
  if (!assignment) return notFound();
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
  );
}
