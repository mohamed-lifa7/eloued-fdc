import React from "react";
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
import { formatToURL } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Home", href: "/", disabled: false, type: "link" },
  { title: "Assignments", disabled: false, type: "text" },
];
export const assignments = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    description:
      "Learn the basics of React Hooks and how to use them in your projects.",
    topic: "React",
    session: "Frontend Development Workshop",
    deadline: "2023-06-15",
    status: "Not Started",
  },
  {
    id: 2,
    title: "Building RESTful APIs with Node.js",
    description: "Create a simple RESTful API using Node.js and Express.",
    topic: "Node.js",
    session: "Backend Development Workshop",
    deadline: "2023-06-20",
    status: "In Progress",
  },
  {
    id: 3,
    title: "CSS Grid Layout Challenge",
    description: "Design a responsive layout using CSS Grid.",
    topic: "CSS",
    session: "Web Design Fundamentals",
    deadline: "2023-06-18",
    status: "Completed",
  },
];
const page = () => {
  return (
    <div className="space-y-4">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="Assignments"
        description="Review and complete tasks to solidify your understanding of workshop topics"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Calendar size={16} className="mr-2" />
                <span>
                  {assignment.topic} - {assignment.session}
                </span>
              </div>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Clock size={16} className="mr-2" />
                <span>Due: {assignment.deadline}</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Badge
                variant={
                  assignment.status === "Completed"
                    ? "success"
                    : assignment.status === "In Progress"
                      ? "secondary"
                      : "outline"
                }
              >
                {assignment.status}
              </Badge>
              <Button asChild>
                <Link href={`/assignments/${formatToURL(assignment.title)}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
