"use client";

import { updateProfileImage } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SingleImageDropzone } from "@/components/ui/single-image-uploader";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/providers/edgestore-provider";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function UpdateImage() {
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (imageUrl: string) => {
    startTransition(() => {
      updateProfileImage(imageUrl)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setFile(undefined);
            setProgress(0);
            router.refresh();
          }

          if (data.success) {
            toast.success(data.success);
            setProgress(0);
            setFile(undefined);
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <div className="w-full space-y-4">
      <SingleImageDropzone
        className={cn(
          "mx-auto",
          file ? "h-[128px] w-[128px]" : "h-[128px] w-full max-w-[256px]",
        )}
        dropzoneOptions={{
          maxSize: 1048571,
        }}
        value={file}
        onChange={setFile}
        disabled={isPending}
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
        className="w-full"
        disabled={!file || isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Update Image
          </>
        )}
      </Button>
      {(progress > 0 || isPending) && (
        <Progress
          value={progress}
          className="w-full"
          aria-label="Upload progress"
        />
      )}
    </div>
  );
}
