"use client";

import * as React from "react";
import Link from "next/link";

export function MainNav({
  params,
}: {
  params: {
    menu: {
      title: string;
      href: string;
    }[];
  };
}) {
  return (
    <nav className="mr-4 hidden items-center space-x-4 text-sm font-medium md:flex">
      {params.menu.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="transition-colors hover:text-foreground/80"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
