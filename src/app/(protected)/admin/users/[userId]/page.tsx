import { getUserById } from "@/data/user";
import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Heading } from "@/components/ui/heading";
import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import UpdateUserForm from "./update";
import { currentRole } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "لوحة التحكم", href: "/admin", disabled: false, type: "link" },
  { title: "المستخدمين", href: "/admin/users", disabled: false, type: "link" },
  {
    title: "تحديث",
    disabled: false,
    type: "text",
  },
];

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const params = await props.params;
  const user = await getUserById(params.userId);
  const currentUserRole = await currentRole();
  if (currentUserRole == UserRole.ADMIN && user?.role == UserRole.OWNER) {
    return redirect("/accessdenied");
  }
  return (
    <ScrollShadow className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadcrumbMaker items={breadcrumbItems} />
        <Heading
          title="تحديث المستخدم"
          description="تحديث معلومات المستخدم..."
        />
        <UpdateUserForm user={user} />
      </div>
    </ScrollShadow>
  );
}
