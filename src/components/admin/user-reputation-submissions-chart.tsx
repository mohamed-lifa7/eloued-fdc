/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { ChartContainer } from "@/components/ui/chart";

type UserData = {
  name: string;
  reputation: number;
  submissions: number;
};
export default function UserReputationSubmissionsChart({
  userData,
}: {
  userData: UserData[];
}) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>User Reputation vs. Submissions</CardTitle>
        <CardDescription>
          Scatter plot showing the relationship between user reputation and
          number of submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            reputation: {
              label: "Reputation",
              color: "hsl(var(--chart-1))",
            },
            submissions: {
              label: "Code Submissions",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px] w-[400px] max-sm:h-[250px] max-sm:w-[250px]"
        >
          <ResponsiveContainer width="50%" height="50%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="reputation"
                name="Reputation"
                unit=" pts"
                label={{
                  value: "Reputation",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                type="number"
                dataKey="submissions"
                name="Submissions"
                label={{
                  value: "Submissions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Users"
                data={userData}
                fill="var(--color-reputation)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (active && payload?.length) {
    return (
      <div className="rounded-md border border-border bg-background p-2 shadow-md">
        <p className="text-sm font-medium">Name: {payload[0].payload.name}</p>
        <p className="text-sm">Reputation: {payload[0].value} pts</p>
        <p className="text-sm">Submissions: {payload[1].value}</p>
      </div>
    );
  }

  return null;
}
