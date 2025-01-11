"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { type Event } from "@prisma/client";
import { formatToURL } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function EventComponent({ event }: { event: Event }) {
  return (
    <div className="flex h-96 items-center justify-center">
      <PinContainer
        title={event.title}
        href={`/blogs/${formatToURL(event.title)}`}
      >
        <div className="flex h-[20rem] w-[20rem] basis-full flex-col justify-between tracking-tight sm:basis-1/2">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
          {/* <div className="mt-4 flex w-full flex-1 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" /> */}
        </div>
      </PinContainer>
    </div>
  );
}
