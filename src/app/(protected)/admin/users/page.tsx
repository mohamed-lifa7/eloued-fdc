import { getAllUsers } from "@/data/user";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Users", disabled: false, type: "text" },
];

export default async function UsersPage() {
  const data = await getAllUsers();

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="User Management"
        description="Manage the user list through this page. Add, edit, and delete users."
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
