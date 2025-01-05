"use server";

import type { z } from "zod";
import { db } from "@/server/db";
import { AssignmentSchema, UpdateAssignmentSchema } from "@/schemas";

/**
 * Create a new assignment.
 *
 * @param values - The values for the new assignment.
 * @returns An object with either a success message or an error message.
 */
export const createAssignment = async (
  values: z.infer<typeof AssignmentSchema>,
) => {
  try {
    // Validate input fields using the AssignmentSchema
    const validatedFields = AssignmentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid assignment data!" };
    }

    const { title, description, eventId } = validatedFields.data;

    // Create the new assignment
    await db.assignment.create({
      data: {
        title,
        description,
        eventId,
      },
    });

    return { success: "Assignment created successfully!" };
  } catch (error) {
    console.error("Error creating assignment", error);
    return { error: "Failed to create assignment. Please try again." };
  }
};

/**
 * Update an existing assignment.
 *
 * @param id - The ID of the assignment to update.
 * @param values - The new values for the assignment.
 * @returns An object with either a success message or an error message.
 */
export const updateAssignment = async (
  id: string,
  values: z.infer<typeof UpdateAssignmentSchema>,
) => {
  try {
    const validatedFields = UpdateAssignmentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid assignment data!" };
    }

    await db.assignment.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
      },
    });

    return { success: "Assignment updated successfully!" };
  } catch (error) {
    console.error("Error updating assignment", error);
    return { error: "Failed to update assignment." };
  }
};

/**
 * Delete an assignment.
 *
 * @param id - The ID of the assignment to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteAssignment = async (id: string) => {
  try {
    await db.assignment.delete({
      where: { id },
    });

    return { success: "Assignment deleted successfully!" };
  } catch (error) {
    console.error("Error deleting assignment", error);
    return { error: "Failed to delete assignment." };
  }
};
