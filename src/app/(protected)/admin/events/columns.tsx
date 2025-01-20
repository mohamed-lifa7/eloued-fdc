"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { type Event } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status == "past"
              ? "default"
              : status == "upcoming"
                ? "success"
                : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const timeAndDate = row.original.startDate?.toLocaleDateString();
      if (timeAndDate) {
        return (
          <time dateTime={row.original.startDate?.toString()}>
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
    cell: ({ row }) => <CellAction event={row.original} />,
  },
];
