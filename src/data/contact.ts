import { db } from "@/server/db";

/**
 * Retrieves a contact form by its ID.
 * @param id - The ID of the contact form to retrieve.
 * @returns The contact form object if found, or null if not found.
 */
export const getContactFormById = async (id: string) => {
  try {
    const contactForm = await db.contactForm.findUnique({ where: { id } });

    return contactForm;
  } catch {
    return null;
  }
};

/**
 * Retrieves the count of contact forms from the database.
 * @returns {Promise<number>} The count of contact.
 */
export const getContactFormsCount = async () => {
  const count = await db.contactForm.count();
  return count;
};

/**
 * Retrieves all contact forms from the database.
 * @returns A promise that resolves to an array of contact forms.
 */
export const getAllContactForms = async () => {
  const contactForms = await db.contactForm.findMany();
  return contactForms;
};
