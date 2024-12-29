import Link from "next/link";
import { slug } from "github-slugger";
import { Chip } from "@nextui-org/react";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link href={`/tags/${slug(tag)}`}>
      <Chip color={current ? "primary" : "default"}>
        {tag} {count ? `(${count})` : null}
      </Chip>
    </Link>
  );
}
