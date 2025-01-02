import { db } from "@/server/db";

/**
 * Retrieves an event by its ID.
 * @param id - The ID of the event to retrieve.
 * @returns The event object if found, or null if not found.
 */
export const getEventById = async (id: string) => {
  try {
    const event = await db.event.findUnique({
      where: { id },
    });

    return event;
  } catch {
    return null;
  }
};

/**
 * Retrieves the count of events from the database.
 * @returns {Promise<number>} The count of events.
 */
export const getEventsCount = async () => {
  try {
    const count = await db.event.count();
    return count;
  } catch {
    return 0;
  }
};

/**
 * Retrieves all events with specific status from the database with specific fields.
 * @returns A promise that resolves to an array of events.
 */
export const getEventsByStatus = async (status: string) => {
  try {
    const events = await db.event.findMany({
      where: { status },
    });
    return events;
  } catch {
    return [];
  }
};

/**
 * Retrieves all events from the database with specific fields.
 * @returns A promise that resolves to an array of events.
 */
export const getAllEvents = async () => {
  try {
    const events = await db.event.findMany();
    return events;
  } catch {
    return [];
  }
};
