import Link from "next/link";
import { slug } from "github-slugger";
import { Badge } from "../ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link href={`/tags/${slug(tag)}`}>
      <Badge variant={current ? "default" : "secondary"}>
        {tag} {count ? `(${count})` : null}
      </Badge>
    </Link>
  );
}
