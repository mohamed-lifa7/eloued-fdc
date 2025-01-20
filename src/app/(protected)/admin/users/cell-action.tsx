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
import { AlertModal } from "@/components/alert-modal";
import type { User } from "@prisma/client";
import { deleteUser } from "@/actions/user";
import { toast } from "sonner";

interface CellActionProps {
  user: User;
}

export const CellAction: React.FC<CellActionProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onConfirm = async () => {
    startTransition(() => {
      deleteUser(user.id)
        .then((data) => {
          if (data.error) {
            toast.error("Error", {
              description: "Failed to delete the user, Please try again!",
            });
          }

          if (data.success) {
            toast.success("Success", {
              description: "You have deleted the user successfully.",
            });
            setOpen(false);
          }
        })
        .catch(() =>
          toast.error("Error", {
            description: "Something went wrong!",
          }),
        );
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
            onClick={() => router.push(`/admin/users/${user.id}`)}
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
