"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface AssignmentData {
  title: string;
  quizCount: number;
  codeQuestionCount: number;
}

interface AssignmentOverviewChartProps {
  data: AssignmentData[];
}

export function AssignmentOverviewChart({
  data,
}: AssignmentOverviewChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assignment Overview</CardTitle>
        <CardDescription>
          Number of quizzes and code questions per assignment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            quizzes: {
              label: "Quizzes",
              color: "hsl(var(--chart-1))",
            },
            codeQuestions: {
              label: "Code Questions",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px] max-sm:h-[250px] max-sm:w-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="quizCount"
                stackId="a"
                fill="var(--color-quizzes)"
                name="Quizzes"
              />
              <Bar
                dataKey="codeQuestionCount"
                stackId="a"
                fill="var(--color-codeQuestions)"
                name="Code Questions"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
