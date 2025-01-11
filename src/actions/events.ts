"use server";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import { UserRole } from "@prisma/client";
import { type EventSchema } from "@/schemas";
import type { z } from "zod";

/**
 * Creates a new event in the database.
 *
 * @param eventData - The data for the new event.
 * @returns An object with either the created event or an error message.
 */
export const createEvent = async (eventData: z.infer<typeof EventSchema>) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found." };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to create events!" };
    }

    const newEvent = await db.event.create({
      data: eventData,
    });

    return { success: "Event created successfully!", event: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "An error occurred while creating the event." };
  }
};

/**
 * Updates an existing event in the database.
 *
 * @param eventId - The ID of the event to update.
 * @param eventData - The new data for the event.
 * @returns An object with either the updated event or an error message.
 */
export const updateEvent = async (
  eventId: string,
  eventData: Partial<{
    title: string;
    description: string;
    imageUrl: string;
    location: string;
    startDate: Date;
    endDate: Date;
  }>,
) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to update events!" };
    }

    const updatedEvent = await db.event.update({
      where: { id: eventId },
      data: eventData,
    });

    return { success: "Event updated successfully!", event: updatedEvent };
  } catch (error) {
    console.error("Error updating event:", error);
    return { error: "An error occurred while updating the event." };
  }
};

/**
 * Deletes an event by its ID.
 *
 * @param eventId - The ID of the event to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteEvent = async (eventId: string) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to delete events!" };
    }

    await db.event.delete({
      where: { id: eventId },
    });

    return { success: "Event has been deleted!" };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { error: "An error occurred while deleting the event." };
  }
};
