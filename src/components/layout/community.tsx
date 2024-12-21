"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Community = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 text-center md:px-8">
      <h2 className="text-pretty text-3xl font-bold md:text-4xl">
        انضم إلى مجتمعنا
      </h2>
      <p className="text-muted-foreground mt-4 text-lg">
        تواصل مع المطورين الآخرين، شارك الأفكار، واستفد من الموارد القيمة.
      </p>
      <div className="mt-8">
        <Button>
          <Link
            href="https://t.me/+e2kKkyiEqCw4ZTlk"
            target="_blank"
            rel="noopener noreferrer"
          >
            انضم إلى مجموعتنا على Telegram
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Community;
