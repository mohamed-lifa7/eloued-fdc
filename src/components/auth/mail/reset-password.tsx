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

interface ResetPasswordMagicLinkEmailProps {
  resetLink?: string;
}

export const ResetPasswordMagicLinkEmail = ({
  resetLink,
}: ResetPasswordMagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>إعادة تعيين كلمة المرور الخاصة بك</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>إعادة تعيين كلمة المرور</Heading>
          <Link
            href={resetLink}
            target="_blank"
            style={{
              ...link,
              display: "block",
              marginBottom: "16px",
            }}
          >
            اضغط هنا لإعادة تعيين كلمة المرور الخاصة بك
          </Link>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            إذا لم تكن قد طلبت إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد
            الإلكتروني بأمان.
          </Text>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "12px",
              marginBottom: "38px",
            }}
          >
            نصيحة: استخدم كلمة مرور قوية للمزيد من الأمان.
          </Text>
          <Text style={footer}>
            <Link
              href={`https://eloued-fdc.vercel.app`}
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              https://eloued-fdc.vercel.app
            </Link>
            ، هو الموقع الرسمي لنادي المطورين المستقبليين.
            <br />
            نساعدك على بناء المستقبل مع مجتمعنا التقني.
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
