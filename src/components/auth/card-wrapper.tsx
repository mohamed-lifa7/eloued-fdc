"use client";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  descriptionLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  descriptionLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header headerLabel={headerLabel} descriptionLabel={descriptionLabel} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="text-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
