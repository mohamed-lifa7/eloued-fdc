import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { env } from "@/env";

interface VerifyMagicLinkEmailProps {
  confirmLink?: string;
}

export const VerifyMagicLinkEmail = ({
  confirmLink,
}: VerifyMagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Join the Future Developers Club</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to the Future Developers Club!</Heading>
          <Link
            href={confirmLink}
            target="_blank"
            style={{
              ...link,
              display: "block",
              marginBottom: "16px",
            }}
          >
            Click here to confirm your email and join us.
          </Link>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            We are here to support you in building your technical skills and
            working on innovative projects.
          </Text>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "12px",
              marginBottom: "38px",
            }}
          >
            If you haven&apos;t attempted to join the club, you can safely
            ignore this email.
          </Text>
          <Text style={footer}>
            <Link
              href={env.NEXT_PUBLIC_APP_URL}
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              {env.NEXT_PUBLIC_APP_URL}
            </Link>
            , a platform for future developers.
            <br /> Be part of our community and start your technical journey
            today!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#0a0a0a",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
