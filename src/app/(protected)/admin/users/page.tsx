import { getAllUsers } from "@/data/user";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "لوحة التحكم", href: "/admin", disabled: false, type: "link" },
  { title: "المستخدمين", disabled: false, type: "text" },
];

export default async function UsersPage() {
  const data = await getAllUsers();

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="إدارة المستخدمين"
        description="إدارة قائمة المستخدمين من خلال هذه الصفحة. إضافة، تعديل، وحذف المستخدمين."
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
