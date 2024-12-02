"use server";

import type * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/server/auth";
import { db } from "@/server/db";
import { type SettingsSchema, updateUserSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/server/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

/**
 * Updates the user settings based on the provided values.
 *
 * @param values - The values to update the settings with.
 * @returns An object indicating the result of the settings update.
 *          - If the update is successful, it returns { success: "تم تحديث الإعدادات!" }.
 *          - If the user is unauthorized, it returns { error: "غير مصرح" }.
 *          - If the email is already in use, it returns { error: "البريد الإلكتروني قيد الاستخدام!" }.
 *          - If the password is incorrect, it returns { error: "كلمة المرور غير صحيحة!" }.
 *          - If a verification email is sent, it returns { success: "تم إرسال بريد التحقق!" }.
 */
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "غير مصرح" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "غير مصرح" };
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
      return { error: "البريد الإلكتروني قيد الاستخدام!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "تم إرسال بريد التحقق!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "كلمة المرور غير صحيحة!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

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

  return { success: "تم تحديث الإعدادات!" };
};

/**
 * Updates the user settings based on the provided values.
 *
 * @param userId - The ID of the user to update.
 * @param values - The values to update the settings with.
 * @returns An object indicating the result of the settings update.
 *          - If the update is successful, it returns { success: "تم تحديث المستخدم!" }.
 *          - If the user is not found, it returns { error: "المستخدم غير موجود!" }.
 *          - If the email is already in use, it returns { error: "البريد الإلكتروني قيد الاستخدام!" }.
 *          - If the input data is invalid, it returns { error: "بيانات الإدخال غير صالحة" }.
 *          - If an error occurs while updating the user, it returns { error: "حدث خطأ أثناء تحديث المستخدم." }.
 */
export const updateUser = async (
  userId: string,
  values: z.infer<typeof updateUserSchema>,
) => {
  try {
    // Validate userId and values
    if (!userId || !updateUserSchema.safeParse(values).success) {
      return { error: "بيانات الإدخال غير صالحة" };
    }

    const user = await getUserById(userId);

    if (!user) {
      return { error: "المستخدم غير موجود!" };
    }

    await db.user.update({
      where: { id: user.id },
      data: { ...values },
    });

    return { success: "تم تحديث المستخدم!" };
  } catch (error) {
    // Log error
    console.error("خطأ أثناء تحديث المستخدم:", error);
    return { error: "حدث خطأ أثناء تحديث المستخدم." };
  }
};
