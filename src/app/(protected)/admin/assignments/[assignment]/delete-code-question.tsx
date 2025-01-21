"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AlertModal } from "@/components/alert-modal";
import { deleteCodeQuestion } from "@/actions/quizzes";
import { useRouter } from "next/navigation";

export const DeleteCodeQuestion = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onConfirm = async () => {
    startTransition(() => {
      deleteCodeQuestion(id)
        .then((data) => {
          if (data.error) {
            toast.error("Error", {
              description:
                "Failed to delete the code question, Please try again!",
            });
          }

          if (data.success) {
            toast.success("Success", {
              description: "You have deleted the code question successfully.",
            });
            setOpen(false);
            router.refresh();
          }
        })
        .catch((e) => {
          if (e instanceof Error) {
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
      <Button variant="destructive" onClick={() => setOpen(true)}>
        <Trash className="mr-2 h-4 w-4" /> Delete
      </Button>
    </>
  );
};
