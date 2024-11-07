import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserById } from "@/data/user";
import React from "react";
import UpdateUserForm from "./update-user";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "User", link: "/admin/users" },
  { title: "update", link: "/admin/users/update" },
];
export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUserById(params.userId);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title="Update User" description="Update user details" />
        <UpdateUserForm user={user} />
      </div>
    </ScrollArea>
  );
}
