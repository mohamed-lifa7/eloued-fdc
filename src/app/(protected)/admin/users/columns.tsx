"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole, type User } from "@prisma/client";
import { Chip } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const columnTranslations = {
  id: "معرف",
  name: "الإسم",
  email: "الإميل",
  emailVerified: "تاريخ تأكيد البريد",
  image: "الصورة",
  password: "كلمة المرور",
  role: "الدور",
  accounts: "الحسابات",
  isTwoFactorEnabled: "تفعيل التحقق الثنائي",
  twoFactorConfirmation: "تأكيد التحقق الثنائي",
};

export const userRoleTranslations = {
  OWNER: "المالك",
  ADMIN: "مسؤول",
  USER: "مستخدم",
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: columnTranslations.name,
  },
  {
    accessorKey: "role",
    header: columnTranslations.role,
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Chip color={role == UserRole.ADMIN ? "primary" : role == UserRole.OWNER ? "success" : "secondary"}>
          {userRoleTranslations[role]}
        </Chip>
      );
    },
  },
  {
    accessorKey: "email",
    header: columnTranslations.email,
  },
  {
    accessorKey: "emailVerified",
    header: columnTranslations.emailVerified,
    cell: ({ row }) => {
      const timeAndDate = row.original.emailVerified?.toLocaleDateString();
      if (timeAndDate) {
        return (
          <time dateTime={row.original.emailVerified?.toString()}>
            {timeAndDate}
          </time>
        );
      } else {
        return <span>لم يتم التفعيل</span>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              key="copy"
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              نسخ معرف المستخدم
            </DropdownMenuItem>
            <DropdownMenuItem key="view">
              <Link href={`/admin/users/${user.id}`}>عرض تفاصيل المستخدم</Link>
            </DropdownMenuItem>
            <DropdownMenuItem key="delete" className="text-danger">
              حذف المستخدم
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
