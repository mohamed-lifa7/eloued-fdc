import React from "react";
import { Heading } from "@/components/ui/heading";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { getContactFormById } from "@/data/contact";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  {
    title: "Contact Us",
    href: "/admin/contact",
    disabled: false,
    type: "link",
  },
  { title: "View Details", disabled: false, type: "text" },
];

export default async function Page(props: {
  params: Promise<{ contact: string }>;
}) {
  const params = await props.params;
  const contact = await getContactFormById(params.contact);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbMaker items={breadcrumbItems} />

        {/* Heading */}
        <Heading
          title="View Contact Form Details"
          description="View the contact form submission."
        />

        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>{contact?.name}</CardTitle>
            <CardDescription>{contact?.email}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <p>{contact?.message}</p>
          </CardContent>
          <Separator />
          <CardFooter>
            <p className="text-sm text-foreground-400">
              <span className="font-medium">Submitted on:</span>{" "}
              {new Date(
                contact?.createdAt !== undefined ? contact?.createdAt : "00",
              ).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
}
