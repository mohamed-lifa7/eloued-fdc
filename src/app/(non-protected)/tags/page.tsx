import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { type Metadata } from "next";
import { posts } from ".velite";
import { Tag } from "@/components/blogs/tag";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default async function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <main className="container my-20 max-w-4xl space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-semibold lg:text-5xl">Tags</h1>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </main>
  );
}
