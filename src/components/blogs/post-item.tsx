import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">
              <Link href={"/" + slug}>{title}</Link>
            </h2>
          </CardTitle>
          <CardDescription className="space-x-2">
            {tags?.map((tag) => <Tag tag={tag} key={tag} />)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-none text-muted-foreground">{description}</div>
          <div className="flex items-center justify-between">
            <dl>
              <dt className="sr-only">Published On</dt>
              <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
                <Calendar className="h-4 w-4" />
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </dl>
            <Link
              href={"/" + slug}
              className={cn(buttonVariants({ variant: "link" }), "py-0")}
            >
              Read more →
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
