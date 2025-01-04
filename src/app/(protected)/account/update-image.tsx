"use client";

import { updateProfileImage } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SingleImageDropzone } from "@/components/ui/single-image-uploader";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/providers/edgestore-provider";
import { useSession } from "next-auth/react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

export function UpdateImage() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const { update } = useSession();

  const onSubmit = (imageUrl: string) => {
    startTransition(() => {
      updateProfileImage(imageUrl)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <div className="w-full space-y-4">
      <SingleImageDropzone
        className={cn(
          `${file ? "h-[128px] w-[128px]" : "h-0 w-0"}`,
        )}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <Button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
            console.log(res);
            onSubmit(res.url);
            void update();
          }
        }}
        variant="primary2"
      >
        Update
      </Button>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
