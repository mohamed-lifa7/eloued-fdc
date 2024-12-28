import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Link from "next/link";

export type BreadcrumbType = {
  title: string;
  href?: string;
  type: "text" | "link";
  disabled: boolean;
};

export function BreadcrumbMaker({ items }: { items: BreadcrumbType[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem aria-disabled={item.disabled}>
                {item.type === "link" ? (
                  <BreadcrumbLink href={item.href} asChild>
                    <Link href={item.href!}>{item.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {/* Add separator after each item except the last one */}
              {index !== items.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
