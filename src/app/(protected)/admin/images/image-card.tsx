"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEdgeStore } from "@/providers/edgestore-provider";
import { useRouter } from "next/navigation";

interface ImageCardProps {
  imageUrl: string;
  index: number;
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, index }) => {
  const [copied, setCopied] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("URL Copied", {
        description: "Image URL has been copied to clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Copy Failed", {
        description: "Failed to copy image URL. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await edgestore.publicFiles.delete({
        url: imageUrl,
      });
      setIsDeleteDialogOpen(false);
      toast.success("Image Deleted", {
        description: "The image has been successfully deleted.",
      });
      router.refresh()
    } catch (err) {
      console.error("Failed to delete: ", err);
      toast.error("Deletion Failed", {
        description: "Failed to delete the image. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleDownload = async () => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
  
      // Create a downloadable link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
  
      // Use the image name or a default name for the file
      const fileName = imageUrl.split("/").pop() ?? `downloaded-image-${index}`;
      link.download = fileName;
  
      // Trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      toast.success("Download Successed", {
        description: "Your image is being downloaded.",
      });
    } catch (err) {
      console.error("Failed to download image:", err);
      toast.error("Download Failed", {
        description: "Failed to download the image. Please try again.",
      });
    }
  };
  

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-2">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className=""
            disabled={copied}
          >
            <span className={cn(copied ? "text-green-500" : "")}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </Button>
          <Button
            onClick={() => setIsDeleteDialogOpen(true)}
            variant="destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDownload}
            variant="primary2"
            className=""
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
