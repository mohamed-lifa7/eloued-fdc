import { BreadcrumbMaker, type BreadcrumbType } from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { getFiles } from "@/lib/edgestore-server";
import React from "react";
import { ImageCard } from "./image-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationWrapper } from "./pagination";
import { ImageUploadDialog } from "./upload";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/admin", disabled: false, type: "link" },
  { title: "Images", disabled: false, type: "text" },
];

interface GalleryPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 12;
const GalleryPage = async ({ searchParams }: GalleryPageProps) => {
  const page = (await searchParams).page;
  const currentPage = Number(page) || 1;
  let data;
  let error;
  let totalCount = 0;
  let totalPages = 1;
  try {
    const res = await getFiles(currentPage);
    data = res.data;
    totalCount = res.pagination.totalCount;
    totalPages = res.pagination.totalPages;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error = "Failed to load images";
  }

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <div className="flex justify-between">
        <Heading
          title="Image Gallery"
          description="Manage and copy image URLs from your gallery."
        />
        <ImageUploadDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {!data && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
                <Skeleton key={index} className="aspect-square w-full" />
              ))}
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((image, index) => (
                  <ImageCard
                    key={image.url}
                    imageUrl={image.url}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-8">
                <PaginationWrapper
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemCount={totalCount}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryPage;
