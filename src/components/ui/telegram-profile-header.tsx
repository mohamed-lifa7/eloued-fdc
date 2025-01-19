"use client";
import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export interface TelegramHeaderProps {
  avatar: string;
  name: string;
  rank: string;
  exp: number;
}

export function TelegramHeader({
  avatar,
  name,
  rank,
  exp,
}: TelegramHeaderProps) {
  const [expand, setExpand] = React.useState(false);
  const { theme } = useTheme();
  return (
    <MotionConfig
      transition={{
        duration: 0.4,
        type: "spring",
        bounce: 0.2,
      }}
    >
      <motion.header
        layout
        style={{ aspectRatio: expand ? "1/1" : "" }}
        className={cn(
          "relative isolate flex flex-col",
          expand
            ? "mt-0 items-start justify-end p-4"
            : "mt-4 items-center justify-center",
        )}
      >
        <motion.button
          layoutId="user-avatar"
          className="relative flex aspect-square w-16 items-start justify-center overflow-hidden"
          onClick={() => setExpand(!expand)}
          style={{
            borderRadius: 34,
          }}
        >
          <Image
            src={avatar}
            alt={name}
            fill
            className="pointer-events-none h-full w-full object-cover"
          />
        </motion.button>

        <motion.div
          className={`relative z-20 flex flex-col ${expand ? "items-start" : "items-center"}`}
        >
          <motion.h2
            layout
            className="inline-block text-xl font-medium"
            animate={{
              color: expand
                ? "#ffffff"
                : theme == "dark"
                  ? "#ffffff"
                  : "#000000",
            }}
          >
            {name}
          </motion.h2>
          <motion.div
            layout
            className={`flex gap-1 text-xs text-foreground ${expand ? "mb-0" : "mb-4"}`}
            animate={{ color: expand ? "#ffffff" : "#8C8C93" }}
          >
            <p className="capitalize tracking-tight">{rank.toLowerCase()}</p> •{" "}
            <p>{exp} points</p>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {expand && (
            <motion.button
              layoutId="user-avatar"
              className="absolute inset-0 -z-10 aspect-square overflow-hidden"
              style={{ borderRadius: 0 }}
              onClick={() => setExpand(!expand)}
            >
              <Image
                src={avatar}
                alt={name}
                width={400}
                height={400}
                className="pointer-events-none h-full w-full object-cover"
              />
              <motion.div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/50 to-transparent" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.header>
    </MotionConfig>
  );
}
