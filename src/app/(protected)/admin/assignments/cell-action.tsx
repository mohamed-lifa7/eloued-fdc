"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AlertModal } from "./alert-modal";
import type { Assignment } from "@prisma/client";
import { toast } from "sonner";
import { deleteAssignment } from "@/actions/assignments";

interface CellActionProps {
  assignment: Assignment;
}

export const CellAction: React.FC<CellActionProps> = ({ assignment }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onConfirm = async () => {
    startTransition(() => {
      deleteAssignment(assignment.id)
        .then((data) => {
          if (data.error) {
            toast.error("Error", {
              description: "Failed to delete the assignment, Please try again!",
            });
          }

          if (data.success) {
            toast.success("Success", {
              description: "You have deleted the assignment successfully.",
            });
            setOpen(false);
          }
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.log(e.message);
            toast.error("Error", {
              description: "Something went wrong!",
            });
          }
        });
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => router.push(`/admin/assignments/${assignment.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
