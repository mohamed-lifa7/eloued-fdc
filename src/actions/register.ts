"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

type SpamCheckResponse = {
  success: number; // Indicates the success of the request (1 for success, 0 for failure).
  email: {
    lastseen?: string; // Timestamp when the email was last seen in the database (optional).
    frequency?: number; // Number of times the email was reported or seen.
    appears?: number; // Indicates if the email appears in the spam database (1 for yes, 0 for no).
    confidence?: number; // Confidence level (percentage) of the email being spam.
    blacklisted?: number; // Indicates if the email is blacklisted (1 for yes, 0 for no).
    value?: string; // The email address value being checked.
  };
};

/**
 * Registers a new user with the provided values.
 *
 * @param values - The user registration data.
 * @returns An object with either a success message or an error message.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate input fields
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    // Check if the email is already in use
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const response = await fetch(
      `https://stopforumspam.com/api?email=${email}&json`,
    );

    const data = (await response.json()) as SpamCheckResponse;

    if (data.success == 1 && data.email.blacklisted == 1) {
      return { error: "Please don't play this games with us" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully!");
    // Generate verification token and send verification email
    const verificationToken = await generateVerificationToken(email);
    console.log("Verification token:", verificationToken);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during user registration:", error);
    return { error: "An error occurred during registration." };
  }
};
