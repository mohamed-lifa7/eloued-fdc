"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Community = () => {
  return (
    <section className="relative mx-auto max-w-screen-xl px-4 py-16 text-center md:px-8">
      <Image
        src="/svg/09.svg"
        width={1000}
        height={1000}
        alt="FDC"
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />
      <h2 className="text-pretty text-3xl font-bold md:text-4xl">
        انضم إلى مجتمعنا
      </h2>
      <p className="text-muted-foreground mt-4 text-lg">
        تواصل مع المطورين الآخرين، شارك الأفكار، واستفد من الموارد القيمة.
      </p>
      <div className="mt-32">
        <Button
          as={Link}
          href="https://t.me/+e2kKkyiEqCw4ZTlk"
          target="_blank"
          rel="noopener noreferrer"
          color="secondary"
          className="text-white"
          variant="shadow"
        >
          انضم إلى مجموعتنا على Telegram
        </Button>
      </div>
    </section>
  );
};

export default Community;
