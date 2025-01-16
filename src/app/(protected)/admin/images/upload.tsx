"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEdgeStore } from "@/providers/edgestore-provider";
import { SingleImageDropzone } from "@/components/ui/single-image-uploader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ImageUploadDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [isPending, startTransition] = useTransition();

  const onUpload = async () => {
    startTransition(async () => {
      if (!file) {
        toast.error("No file selected", {
          description: "Please select an image to upload.",
        });
        return;
      }

      try {
        await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        toast.success("Upload successful", {
          description: "Your image has been uploaded successfully.",
        });
        // Here you might want to update your gallery or perform other actions
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Upload failed", {
          description:
            "There was an error uploading your image. Please try again.",
        });
      } finally {
        setProgress(0);
        setFile(undefined);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Upload New Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Image</DialogTitle>
          <DialogDescription>
            Drag and drop an image or click to select a file to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SingleImageDropzone
            className={cn(
              "mx-auto",
              file ? "h-[128px] w-[128px]" : "h-[128px] w-full max-w-[256px]",
            )}
            value={file}
            onChange={(file) => {
              setFile(file);
              setProgress(0);
            }}
          />

          {progress > 0 && <Progress value={progress} className="w-full" />}
        </div>
        <div className="flex justify-end">
          <Button onClick={onUpload} disabled={!file || progress > 0}>
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
