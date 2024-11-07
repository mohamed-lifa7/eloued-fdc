import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/server/db";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

/**
 * Generates a two-factor authentication token for the given email.
 * If an existing token exists for the email, it will be deleted before generating a new one.
 * @param email - The email for which to generate the token.
 * @returns The generated two-factor authentication token.
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

/**
 * Generates a password reset token for the given email.
 * If an existing token exists for the email, it will be deleted before creating a new one.
 * @param email - The email for which to generate the password reset token.
 * @returns The created password reset token.
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

/**
 * Generates a verification token for the given email.
 * If an existing token exists for the email, it will be deleted before creating a new one.
 * @param email - The email for which to generate the verification token.
 * @returns The newly generated verification token.
 */
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};
