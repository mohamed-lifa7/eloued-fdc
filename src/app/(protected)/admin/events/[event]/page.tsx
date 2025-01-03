import React from "react";
import { Heading } from "@/components/ui/heading";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateEventForm from "./update";
import { getEventById } from "@/data/events";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Events", href: "/admin/events", disabled: false, type: "link" },
  {
    title: "Update",
    disabled: false,
    type: "text",
  },
];

export default async function Page(props: {
  params: Promise<{ event: string }>;
}) {
  const params = await props.params;
  const event = await getEventById(params.event);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadcrumbMaker items={breadcrumbItems} />
        <Heading
          title="Update Event"
          description="Update event information, such as name, date, location, and details."
        />
        <UpdateEventForm event={event} />
      </div>
    </ScrollArea>
  );
}
