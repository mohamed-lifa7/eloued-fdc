import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import AddEventForm from "./add-event-form";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Events", href: "/admin/events", disabled: false, type: "link" },
  { title: "Create", disabled: false, type: "text" },
];

export default async function CreateEventPage() {
  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <Heading
        title="Create a New Event"
        description="Fill out the form below to add a new event to the system."
      />
      <AddEventForm />
    </div>
  );
}
