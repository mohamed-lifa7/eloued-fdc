"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site-config";
import { navLinks } from "@/config/nav-links";

export function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mx-6">
        <span
          className={cn(
            "hidden font-bold underline underline-offset-2 sm:inline-block font-mono",
          )}
        >
          {siteConfig.applicationName}.
        </span>
      </Link>
      <nav className="flex items-center space-x-4 text-sm font-medium rtl:space-x-reverse">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/docs/components")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
