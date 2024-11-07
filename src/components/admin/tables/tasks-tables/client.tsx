"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Task } from "@/types";

interface TasksClientProps {
  data: Task[];
}

export const TasksClient: React.FC<TasksClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Tasks (${data.length})`}
          description="Here's a list of your tasks for this month!"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
