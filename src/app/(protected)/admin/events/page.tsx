import { getAllEvents } from "@/data/events";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Events", disabled: false, type: "text" },
];

export default async function EventsPage() {
  const data = await getAllEvents();
  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <div className="flex justify-between" >
        <Heading
          title="Event Management"
          description="Manage the events list through this page. Add, edit, and delete events."
        />
        <Button asChild>
          <Link href="/admin/events/create">Add New Event</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
