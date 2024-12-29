import { DataTable } from "./data-table";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { columns } from "./columns";
import { getAllContactForms } from "@/data/contact";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  {
    title: "Contact Us",
    disabled: false,
    type: "text",
  },
];

export default async function ContactPage() {
  const data = await getAllContactForms();

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />

      <Heading
        title="Contact Us Management"
        description="View and manage the contact form submissions. You can respond, delete, or review messages submitted through the contact form."
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
