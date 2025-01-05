import { getAssignments } from "@/data/assignments";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Assignments", disabled: false, type: "text" },
];

export default async function AssignmentsPage() {
  const data = await getAssignments();
  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="Assignment Management"
        description="Manage the assignments list through this page. Add, edit, and delete assignments."
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
