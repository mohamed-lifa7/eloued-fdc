"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link href={href} className="w-full font-normal hover:underline">
      {label}
    </Link>
  );
};
