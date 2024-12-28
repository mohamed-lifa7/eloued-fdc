import { VerifyMagicLinkEmail } from "@/components/auth/mail/confirm-email";
import { ResetPasswordMagicLinkEmail } from "@/components/auth/mail/reset-password";
import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

/**
 * Constructs the URL based on the provided path and token.
 * Automatically switches between local and production URLs.
 * @param path - The path for the specific action (e.g., "/auth/new-password").
 * @param token - The token to include in the URL.
 * @returns The constructed URL as a string.
 */
const constructUrl = (path: string, token: string): string => {
  const baseUrl =
    env.NODE_ENV === "production"
      ? "https://eloued-fdc.vercel.app"
      : "http://localhost:3000";
  return `${baseUrl}${path}?token=${token}`;
};

/**
 * Sends an email using the Resend service.
 * @param to - The recipient's email address.
 * @param subject - The subject of the email.
 * @param content - The content of the email (React component or plain HTML).
 */
const sendEmail = async (
  to: string,
  subject: string,
  content: React.ReactNode | string
): Promise<void> => {
  try {
    await resend.emails.send({
      from: "Future Developers Club <noreply@muswaddaty.live>",
      to,
      subject,
      ...(typeof content === "string" ? { html: content } : { react: content }),
    });
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error("Failed to send email.");
  }
};

/**
 * Sends a two-factor authentication token email.
 * @param email - The recipient's email address.
 * @param token - The two-factor authentication token.
 */
export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
): Promise<void> => {
  if (!email || !token) {
    throw new Error("Email and token are required.");
  }
  const html = `<p>رمز التحقق الثنائي: ${token}</p>`;
  await sendEmail(email, "رمز التحقق الثنائي", html);
};

/**
 * Sends a password reset email.
 * @param email - The recipient's email address.
 * @param token - The token used for password reset.
 */
export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  if (!email || !token) {
    throw new Error("Email and token are required.");
  }
  const resetLink = constructUrl("/auth/new-password", token);
  console.log(`confirm link: ${resetLink}`);
  const emailContent = ResetPasswordMagicLinkEmail({ resetLink });
  await sendEmail(email, "إعادة تعيين كلمة المرور", emailContent);
};

/**
 * Sends a verification email with a confirmation link.
 * @param email - The recipient's email address.
 * @param token - The verification token.
 * @returns An object indicating the result of the email sending process.
 */
export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<{ success?: string; error?: string }> => {
  if (!email) {
    return { error: "البريد الإلكتروني مطلوب." };
  }
  if (!token) {
    return { error: "الرمز مطلوب." };
  }

  const confirmLink = constructUrl("/auth/new-verification", token);
  console.log(`confirm link: ${confirmLink}`);

  try {
    const emailContent = VerifyMagicLinkEmail({ confirmLink });
    await sendEmail(email, "تأكيد بريدك الإلكتروني", emailContent);
    return { success: "تم إرسال رسالة التحقق!" };
  } catch (error) {
    console.error("خطأ أثناء إرسال رسالة التحقق:", error);
    return { error: "فشل إرسال رسالة التحقق." };
  }
};
