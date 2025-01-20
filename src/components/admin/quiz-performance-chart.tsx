/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
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

interface QuizPerformanceData {
  quizTitle: string;
  averageScore: number;
  minScore: number;
  maxScore: number;
  submissionCount: number;
}

interface QuizPerformanceChartProps {
  data: QuizPerformanceData[];
}

export function QuizPerformanceChart({ data }: QuizPerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quiz Performance</CardTitle>
        <CardDescription>
          Average, minimum, and maximum scores for each quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px] max-sm:h-[250px] max-sm:w-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="quizTitle" name="Quiz" />
              <YAxis dataKey="averageScore" name="Score" domain={[0, 100]} />
              <ZAxis
                dataKey="submissionCount"
                range={[50, 400]}
                name="Submissions"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Scores" data={data} fill="var(--color-score)" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div>
        <ChartTooltipContent>
          <div className="font-semibold">{data.quizTitle}</div>
          <div>Average Score: {data.averageScore.toFixed(2)}</div>
          <div>Min Score: {data.minScore}</div>
          <div>Max Score: {data.maxScore}</div>
          <div>Submissions: {data.submissionCount}</div>
        </ChartTooltipContent>
      </div>
    );
  }
  return null;
}
