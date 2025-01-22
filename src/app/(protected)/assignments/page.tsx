import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { getAssignments } from "@/data/assignments";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Home", href: "/", disabled: false, type: "link" },
  { title: "Assignments", disabled: false, type: "text" },
];

export default async function Page() {
  const assignments = await getAssignments();
  return (
    <div className="space-y-4">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="Assignments"
        description="Review and complete tasks to solidify your understanding of workshop topics"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments?.map((assignment) => (
          <Card key={assignment.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Calendar size={16} className="mr-2" />
                <span>Event: {assignment.event?.title}</span>
              </div>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Clock size={16} className="mr-2" />
                <span>
                  Due:{" "}
                  <time dateTime={assignment.event?.endDate.toISOString()}>
                    {assignment.event?.endDate.toISOString().split("T")[0]}
                  </time>
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Badge
                variant={
                  assignment.event?.status === "active"
                    ? "success"
                    : assignment.event?.status === "upcoming"
                      ? "secondary"
                      : "outline"
                }
              >
                {assignment.event?.status}
              </Badge>
              <Button asChild>
                <Link href={`/assignments/${assignment.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
