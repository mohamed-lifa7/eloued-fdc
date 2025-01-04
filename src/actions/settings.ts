"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/server/auth";
import { db } from "@/server/db";
import { type SettingsSchema, UpdateUserSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/server/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

/**
 * Updates the user settings based on the provided values.
 *
 * @param values - The values to update the settings with.
 * @returns An object with either an error message or a success message.
 */
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  values.birthday = new Date(values.birthday!).toISOString()
  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  void unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });

  return { success: "Settings Updated!" };
};

/**
 * Updates the user settings based on the provided values.
 *
 * @param userId - The ID of the user to update.
 * @param values - The values to update the settings with.
 * @returns An object with either a success message or an error message.
 */
export const updateUser = async (
  userId: string,
  values: z.infer<typeof UpdateUserSchema>,
) => {
  try {
    // Validate userId and values
    if (!userId || !UpdateUserSchema.safeParse(values).success) {
      return { error: "Invalid input data" };
    }

    const user = await getUserById(userId);

    if (!user) {
      return { error: "User not found!" };
    }

    await db.user.update({
      where: { id: user.id },
      data: { ...values },
    });

    return { success: "User Updated!" };
  } catch (error) {
    // Log error
    console.error("Error updating user:", error);
    return { error: "An error occurred while updating the user." };
  }
};

/**
 * Updates the user's profile image.
 *
 * @param imageUrl - The new image URL to update.
 * @returns An object with either a success message or an error message.
 */
export const updateProfileImage = async (imageUrl: string) => {
  try {
    // Check if the user is authenticated
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    // Fetch the user from the database
    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
      return { error: "User not found!" };
    }

    // Update only the image URL in the database
    await db.user.update({
      where: { id: dbUser.id },
      data: { image: imageUrl },
    });

    return { success: "Profile image updated successfully!" };
  } catch (error) {
    console.error("Error updating profile image:", error);
    return { error: "An error occurred while updating the profile image." };
  }
};
