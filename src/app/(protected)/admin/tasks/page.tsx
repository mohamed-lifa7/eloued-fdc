import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/components/admin/tables/tasks-tables/columns";
import { DataTable } from "@/components/admin/tables/tasks-tables/data-table";
import { taskSchema } from "@/schemas";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TasksClient } from "@/components/admin/tables/tasks-tables/client";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Tasks", link: "/admin/tasks" },
];

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(protected)/admin/tasks/data/tasks.json"),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <TasksClient data={tasks} />
      </div>
    </>
  );
}
