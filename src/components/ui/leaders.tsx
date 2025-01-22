"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./button";

type Leaders = {
  id: string;
  name: string;
  year: string;
  role?: string;
  bio: string;
  src: string;
};
export const LeardersSection = ({
  leaders,
  autoplay = false,
}: {
  leaders: Leaders[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % leaders.length);
  }, [leaders.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + leaders.length) % leaders.length);
  }, [leaders.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : leaders.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={leader.src}
                    alt={leader.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between space-y-4 py-4 md:flex-col">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {leaders[active]?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {leaders[active]?.year}{" "}
              {leaders[active]?.role && `| ${leaders[active]?.role}`}
            </p>
            <motion.p className="mt-8 text-lg text-muted-foreground">
              {leaders[active]?.bio.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex justify-center gap-4 pt-12 md:pt-0">
            <Button
              onClick={handlePrev}
              className="group/button flex items-center justify-center rounded-full"
              size="icon"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </Button>
            <Button
              onClick={handleNext}
              className="group/button flex items-center justify-center rounded-full"
              size="icon"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
