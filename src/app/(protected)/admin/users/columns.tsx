"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { UserRole, type User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "./cell-action";
import Image from "next/image";

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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return (
        <div className="relative aspect-square h-10">
          <Image
            src={row.getValue("image")}
            alt={name.slice(0, 2).toUpperCase()}
            fill
            className="rounded-full"
          />
        </div>
      );
    },
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
        <Badge
          variant={
            role == UserRole.ADMIN
              ? "default"
              : role == UserRole.OWNER
                ? "destructive"
                : "secondary"
          }
        >
          {role}
        </Badge>
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
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
