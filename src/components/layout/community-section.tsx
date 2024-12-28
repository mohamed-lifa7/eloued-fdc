"use client";

import { Spacer } from "@nextui-org/react";
import { Icons } from "../icons";
import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";

const socialMediaLinks: {
  Icon: keyof typeof Icons;
  title: string;
  link: string;
  cardBody: string;
}[] = [
  {
    Icon: "telegram",
    title: "Telegram",
    link: "https://t.me/yourchannel",
    cardBody: "Join us on Telegram for updates and discussions!",
  },
  {
    Icon: "instagram",
    title: "Instagram",
    link: "https://www.instagram.com/yourprofile",
    cardBody: "Follow us on Instagram for photos and stories!",
  },
  {
    Icon: "github",
    title: "GitHub",
    link: "https://github.com/mohamed-lifa7/eloued-fdc",
    cardBody: "Check out the club's website code, it's open source.",
  },
];

export const Community = () => {
  return (
    <section className="container my-16 flex flex-col items-center lg:mt-44">
      <div className="flex max-w-4xl flex-col text-center">
        <div>
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          &nbsp;
          <p className="text-lg md:w-full">
            Connect with other developers, share ideas, and benefit from
            valuable resources.
          </p>
          <Spacer y={12} />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {socialMediaLinks.map((social, index) => {
              const IconComponent = Icons[social.Icon];
              return (
                <Card key={index} className="space-y-4 p-4">
                  <CardHeader className="flex flex-col items-center">
                    <div className="mb-4">
                      {IconComponent && (
                        <IconComponent className="h-12 w-12 text-blue-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{social.title}</h3>
                  </CardHeader>
                  <CardBody className="flex flex-col items-center space-y-4 text-center">
                    <p className="text-foreground">{social.cardBody}</p>
                    <Link href={social.link} isExternal showAnchorIcon>
                      Join {social.title}
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
