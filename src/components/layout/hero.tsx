import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/server/auth";

const Hero = async () => {
  const user = await currentUser();
  return (
    <section className="relative" id="home">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700" />
        <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600" />
      </div>
      <div className="relative ml-auto pt-36">
        <div className="mx-auto text-center lg:w-2/3">
          <h1 className="text-5xl font-bold md:text-6xl xl:text-7xl">
            Nexa-Starter
          </h1>
          <p className="mt-8 text-muted-foreground">
            Quickly launch and scale your next SaaS product with our powerful
            Next.js boilerplate. Designed for efficiency and ease of use.
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
            <Button className="group" asChild variant="outline" size="lg">
              <Link rel="noopener noreferrer" href="/documents">
                <span className="flex items-center">
                  Get started
                  <ChevronRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            {!user && (
              <LoginButton asChild>
                <Button size="lg">Sign in</Button>
              </LoginButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
