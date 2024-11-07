import { env } from "@/env";
import { Resend } from "resend";
import { VerifyMagicLinkEmail } from "@/components/auth/confirm-email";
import { ResetPasswordMagicLinkEmail } from "@/components/auth/reset-email";

const resend = new Resend(env.RESEND_API_KEY);
/**
 * Sends a two-factor authentication token email to the specified email address.
 * @param email - The recipient's email address.
 * @param token - The two-factor authentication token.
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Nexa-starter <noreply@muswaddaty.live>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

/**
 * Sends a password reset email to the specified email address.
 * @param email - The email address to send the password reset email to.
 * @param token - The token used for password reset.
 * @returns A promise that resolves when the email is sent successfully.
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  // const resetLink = `https://nexa-starer.vercel.app/auth/new-password?token=${token}`;
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Nexa-starter <noreply@muswaddaty.live>",
    to: email,
    subject: "Reset your password",
    react: ResetPasswordMagicLinkEmail({ resetLink }),
  });
};

/**
 * Sends a verification email to the specified email address with a confirmation link.
 * @param email - The email address to send the verification email to.
 * @param token - The verification token to include in the confirmation link.
 * @returns An object indicating the result of the email sending process.
 *          If successful, it returns { success: "Verification email sent!" }.
 *          If there is an error, it returns { error: "Error message" }.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    // Validate input parameters
    if (!email) {
      throw new Error("Email is required.");
    }
    if (!token) {
      throw new Error("Token is required.");
    }

    // Construct the confirmation link
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    console.log(`Verification link: ${confirmLink}`);

    // Send the email using the resend service
    const response = await resend.emails.send({
      from: "Nexa-starter <noreply@muswaddaty.live>",
      to: email,
      subject: "Confirm your email",
      react: VerifyMagicLinkEmail({ confirmLink }),
    });

    console.log(`Email send response:`, response);

    return { success: "Verification email sent!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error sending verification email:", error);

    // Return a consistent error response
    return { error: "Failed to send verification email." };
  }
};
