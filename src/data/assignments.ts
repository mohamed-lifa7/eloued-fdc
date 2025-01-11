import { db } from "@/server/db";

/**
 * Retrieves an assignment by its ID.
 * @param id - The ID of the assignment to retrieve.
 * @returns The assignment object if found, or null if not found.
 */
export const getAssignmentById = async (id: string) => {
  try {
    const assignment = await db.assignment.findUnique({
      where: { id },
      include: {
        codeQuestions: true,
        quizzes: {
          include: {
            questions: true,
          },
        },
      },
    });

    return assignment;
  } catch {
    return null;
  }
};

/**
 * Fetch all assignments.
 *
 * @returns A list of assignments or an error message.
 */
export const getAssignments = async () => {
  try {
    const assignments = await db.assignment.findMany({
      include: {
        event: true,
        codeQuestions: true,
        quizzes: {
          include: {
            questions: true,
          },
        },
      },
    });
    return assignments;
  } catch (error) {
    console.error("Error fetching assignments", error);
    return [];
  }
};

/**
 * Fetch all assignments with questions, test cases and event .
 *
 * @returns A list of assignments or an error message.
 */
export const getAssignmentsWithoutQET = async () => {
  try {
    const assignments = await db.assignment.findMany();
    return assignments;
  } catch (error) {
    console.error("Error fetching assignments", error);
    return [];
  }
};
