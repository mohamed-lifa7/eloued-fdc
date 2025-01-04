"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

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

    const { email, password, name, studentId } = validatedFields.data;

    // Check if the email is already in use
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await db.user.create({
      data: {
        name,
        email,
        studentId,
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
