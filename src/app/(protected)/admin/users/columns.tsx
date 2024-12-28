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
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Chip
          color={
            role == UserRole.ADMIN
              ? "primary"
              : role == UserRole.OWNER
                ? "success"
                : "secondary"
          }
        >
          {role}
        </Chip>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "emailVerified",
    header: "Email verified at",
    cell: ({ row }) => {
      const timeAndDate = row.original.emailVerified?.toLocaleDateString();
      if (timeAndDate) {
        return (
          <time dateTime={row.original.emailVerified?.toString()}>
            {timeAndDate}
          </time>
        );
      } else {
        return <span>Not verified yet</span>;
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
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              key="copy"
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User Id
            </DropdownMenuItem>
            <DropdownMenuItem key="view">
              <Link href={`/admin/users/${user.id}`}>View User Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem key="delete" className="text-danger">
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
