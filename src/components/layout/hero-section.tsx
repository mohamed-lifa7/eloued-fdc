import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { links } from "@/config/site-config";

export default async function Hero() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-32">
          <div className="flex flex-col items-center space-y-10">
            <h1 className="font-regular max-w-4xl text-center text-4xl leading-10 tracking-tighter md:text-7xl">
              <span>Future Developers Club, Empowering Growth</span>
              <span className="relative flex w-full justify-center text-center md:py-4">
                &nbsp;
                <GooeyText
                  texts={[
                    "Innovation",
                    "Collaboration",
                    "Leadership",
                    "Excellence",
                  ]}
                  morphTime={1.5}
                  cooldownTime={0.5}
                  className="mt-5 text-4xl"
                />
              </span>
            </h1>

            <p className="max-w-lg text-center text-sm leading-relaxed tracking-tight text-foreground/95 md:text-lg">
              We are a group of passionate students dedicated to making an
              impact in the tech world through learning, collaboration, and
              innovation—while having fun along the way.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button>
              <Link
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                Join us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blogs/getting-started">
                Read our launch article <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
