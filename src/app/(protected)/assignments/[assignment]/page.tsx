import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = (slug: string): BreadcrumbType[] => [
  { title: "Home", href: "/", disabled: false, type: "link" },
  { title: "Assignments", href: "/assignments", disabled: false, type: "link" },
  { title: slug.replace(/-/g, " "), disabled: true, type: "text" },
];

export default async function Page(props: {
  params: Promise<{ assignment: string }>;
}) {
  // always with promise
  const { assignment } = await props.params;
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadcrumbMaker items={breadcrumbItems(assignment)} />
        <Heading
          title={assignment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
          description="Explore the assignment details and complete the tasks."
        />
      </div>
    </ScrollArea>
  );
}
