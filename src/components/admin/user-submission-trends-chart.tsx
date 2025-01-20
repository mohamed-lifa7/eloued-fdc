"use client";

import {
  LineChart,
  Line,
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

interface SubmissionTrendData {
  date: string;
  quizSubmissions: number;
  codeSubmissions: number;
}

interface UserSubmissionTrendsChartProps {
  data: SubmissionTrendData[];
}

export function UserSubmissionTrendsChart({
  data,
}: UserSubmissionTrendsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Submission Trends</CardTitle>
        <CardDescription>
          Number of quiz and code submissions over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            quizSubmissions: {
              label: "Quiz Submissions",
              color: "hsl(var(--chart-1))",
            },
            codeSubmissions: {
              label: "Code Submissions",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px] max-sm:h-[250px] max-sm:w-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="quizSubmissions"
                stroke="var(--color-quizSubmissions)"
              />
              <Line
                type="monotone"
                dataKey="codeSubmissions"
                stroke="var(--color-codeSubmissions)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
