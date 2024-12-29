"use client";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { LoginButton } from "../auth/login-button";
import { links } from "@/config/site-config";

export default function Hero() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-32">
          <div>
            <Badge variant="secondary" className="gap-4 rounded-full py-2">
              Read our launch article <MoveRight className="h-4 w-4" />
            </Badge>
          </div>
          <div className="flex flex-col items-center space-y-10">
            <h1 className="font-regular max-w-4xl text-center text-4xl tracking-tighter md:text-7xl">
              <span>Future Developers Club, Empowering Growth</span>
              <span className="relative flex w-full justify-center text-center md:pb-4 md:pt-1">
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

            <p className="max-w-2xl text-center text-sm leading-relaxed tracking-tight text-muted-foreground md:text-lg">
              We are a group of passionate students dedicated to making an
              impact in the tech world through learning, collaboration, and
              innovation—while having fun along the way.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button variant="outline">
              <Link
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join us
              </Link>
            </Button>
            <LoginButton asChild>
              <Button className="gap-4" variant="primary2">
                Sign up here <MoveRight className="h-4 w-4" />
              </Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </div>
  );
}
