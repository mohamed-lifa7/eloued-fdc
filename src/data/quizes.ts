import { db } from "@/server/db";

/**
 * Retrieves an quiz by its ID.
 * @param id - The ID of the quiz to retrieve.
 * @returns The quiz object if found, or null if not found.
 */
export const getQuizById = async (id: string) => {
  try {
    const quiz = await db.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    return quiz;
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
 * Fetch all assignments .
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

/**
 * Retrieves an code question by its ID.
 * @param id - The ID of the code question to retrieve.
 * @returns The code question object if found, or null if not found.
 */
export const getCodeQuestionById = async (id: string) => {
  try {
    const codeQuestion = await db.codeQuestion.findUnique({
      where: { id },
    });

    return codeQuestion;
  } catch {
    return null;
  }
};
