import { posts } from ".velite";
import { PostItem } from "@/components/blogs/post-item";
import { QueryPagination } from "@/components/blogs/query-pagination";
import { Tag } from "@/components/blogs/tag";
import { Separator } from "@/components/ui/separator";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stay updated with the latest articles, tutorials, and insights on document editing, collaboration, and productivity. Discover tips, best practices, and the latest features of Muswaddaty Inc.",
};
const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">
            Blogs
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest articles, tutorials, and insights on
            document editing, collaboration, and productivity. Discover tips,
            best practices, and the latest features of Muswaddaty.
          </p>
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="mt-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col space-y-4">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="mt-4 justify-end"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <p className="text-md">Tags</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
