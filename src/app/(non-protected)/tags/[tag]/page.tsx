import { posts } from ".velite";
import { PostItem } from "@/components/blogs/post-item";
import { Tag } from "@/components/blogs/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { type Metadata } from "next";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = (await params).tag;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const title = tag.split("-").join(" ");

  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts.filter((post) => post.published);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <main className="container my-20 max-w-4xl space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-semibold lg:text-5xl">{title}</h1>
      </div>
      <Separator />
      <div className="mt-8 grid grid-cols-12 gap-3">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
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
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
