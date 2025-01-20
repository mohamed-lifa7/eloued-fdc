"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { type Assignment } from "@prisma/client";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Assignment>[] = [
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Start Date",
    cell: ({ row }) => {
      const timeAndDate = row.original.createdAt?.toLocaleDateString();
      return (
        <time dateTime={row.original.createdAt?.toString()}>{timeAndDate}</time>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction assignment={row.original} />,
  },
];
