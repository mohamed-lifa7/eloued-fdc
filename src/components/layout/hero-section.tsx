"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-12 px-4 py-28 md:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-5 text-center"
      >
        <Badge
          className="text-primary-500 dark:text-primary-600 flex items-center space-x-2 text-xs font-semibold"
          variant="outline"
        >
          <span>We Are Here</span>
          <span aria-label="emoji" role="img">
            🔥
          </span>
        </Badge>
        <h1 className="mx-auto text-pretty text-4xl font-medium tracking-tighter md:text-6xl">
          Welcome to the Future Developers Club!
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          Discover and develop your skills in programming and modern
          technologies with the Future Developers Club.
        </p>

        <Button className="bg-primary-2 shadow-primary-2/50">
          Learn More About the Club
        </Button>
      </motion.div>
    </section>
  );
}
