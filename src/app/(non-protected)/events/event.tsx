"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { type Event } from "@prisma/client";
import { formatToURL } from "@/lib/utils";

export function EventComponent({ event }: { event: Event }) {
  return (
    <div className="flex h-96 items-center justify-center">
      <PinContainer
        title={event.title}
        href={`/blogs/${formatToURL(event.title)}`}
      >
        <div className="flex h-[20rem] w-[20rem] basis-full flex-col p-4 tracking-tight sm:basis-1/2">
          <h3 className="!m-0 max-w-xs !pb-2 text-base font-bold ">
            {event.title}
          </h3>
          <div className="!m-0 !p-0 text-base font-normal">
            <span className="text-muted-foreground">{event.description}</span>
          </div>
          <div className="mt-4 flex w-full flex-1 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  );
}
