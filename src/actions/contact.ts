"use server";
import { ContactFormSchema } from "@/schemas";
import { db } from "@/server/db";
import { type z } from "zod";

/**
 * Send new contact us form to the database.
 *
 * @param values - The values from the contact form.
 * @returns An object with either a success message or an error message.
 */
export const sendContactForm = async (
  values: z.infer<typeof ContactFormSchema>,
) => {
  try {
    // Validate input fields using the ContactFormSchema
    const validatedFields = ContactFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Fields are not valid!" };
    }

    // Destructure validated fields
    const { email, message, username } = validatedFields.data;

    // Insert the validated contact form data into the database
    await db.contactForm.create({
      data: {
        name: username,
        email,
        message,
      },
    });

    // Return success message
    return { success: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending message", error);
    return {
      error: "There was an error sending your message. Please try again.",
    };
  }
};
