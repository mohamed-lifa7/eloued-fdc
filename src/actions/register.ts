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
 * @returns An object indicating the result of the registration process.
 *          If successful, it returns { success: "تم إرسال بريد التأكيد!" }.
 *          If there are invalid fields, it returns { error: "حقول غير صالحة!" }.
 *          If the email is already in use, it returns { error: "البريد الإلكتروني مستخدم بالفعل!" }.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate input fields
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "حقول غير صالحة!" };
    }

    const { email, password, name } = validatedFields.data;

    // Check if the email is already in use
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "البريد الإلكتروني مستخدم بالفعل!" };
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

    console.log("تم إنشاء المستخدم بنجاح!");
    // Generate verification token and send verification email
    const verificationToken = await generateVerificationToken(email);
    console.log("رمز التحقق:", verificationToken);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "تم إرسال بريد التأكيد!" };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("خطأ أثناء التسجيل:", error);
    return { error: "حدث خطأ أثناء التسجيل." };
  }
};
