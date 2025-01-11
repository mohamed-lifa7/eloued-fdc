import { db } from "@/server/db";

/**
 * Retrieves an answer by its ID.
 * @param id - The ID of the answer to retrieve.
 * @returns The answer object if found, or `null` if not found.
 */
export const getAnswerById = async (id: string) => {
  try {
    const answer = await db.answer.findUnique({ where: { id } });
    return answer;
  } catch (error) {
    console.error("Error retrieving answer by ID:", error);
    return null;
  }
};

/**
 * Retrieves the count of answers from the database.
 * @returns The count of answers as a number.
 */
export const getAnswersCount = async () => {
  try {
    const count = await db.answer.count();
    return count;
  } catch (error) {
    console.error("Error retrieving answers count:", error);
    return 0;
  }
};

/**
 * Retrieves all answers from the database.
 * @returns A promise that resolves to an array of answers, or an empty array if an error occurs.
 */
export const getAllAnswers = async () => {
  try {
    const answers = await db.answer.findMany();
    return answers;
  } catch (error) {
    console.error("Error retrieving all answers:", error);
    return [];
  }
};

/**
 * Retrieves all answers for a specific quiz from the database.
 * @param quizId - The ID of the quiz to retrieve answers for.
 * @returns A promise that resolves to an array of answers, or an empty array if an error occurs.
 */
export const getAllAnswersForQuestion = async (quizId: string) => {
  try {
    const answers = await db.answer.findMany({
      where: {
        quizId,
      },
    });
    return answers;
  } catch (error) {
    console.error("Error retrieving answers for question:", error);
    return [];
  }
};

/**
 * Retrieves all answers for a specific user from the database.
 * @param userId - The ID of the user to retrieve answers for.
 * @returns A promise that resolves to an array of answers, or an empty array if an error occurs.
 */
export const getAllAnswersForUser = async (userId: string) => {
  try {
    const answers = await db.answer.findMany({
      where: {
        userId,
      },
    });
    return answers;
  } catch (error) {
    console.error("Error retrieving answers for user:", error);
    return [];
  }
};

/**
 * Checks if a user has submitted an answer for a specific quiz.
 * @param params - An object containing the following parameters:
 * @param params.quizId - The ID of the quiz to check submissions for.
 * @param params.userId - The ID of the user to check submissions for.
 * @returns A promise that resolves to `true` if the user has submitted an answer, `false` otherwise.
 */
export const isSubmitted = async ({
  quizId,
  userId,
}: {
  quizId: string;
  userId: string;
}) => {
  try {
    const answer = await db.answer.findFirst({
      where: {
        userId,
        quizId,
      },
    });
    return !!answer;
  } catch (error) {
    console.error("Error retrieving answer for user:", error);
    return false;
  }
};

/**
 * Checks if a user has submitted an answer for a specific code question.
 * @param params - An object containing the following parameters:
 * @param params.codeQuestionId - The ID of the quiz to check submissions for.
 * @param params.userId - The ID of the user to check submissions for.
 * @returns A promise that resolves to `true` if the user has submitted an answer, `false` otherwise.
 */
export const isCodeQuestionSubmitted = async ({
  codeQuestionId,
  userId,
}: {
  codeQuestionId: string;
  userId: string;
}) => {
  try {
    const answer = await db.codeSubmission.findFirst({
      where: {
        codeQuestionId,
        userId,
      },
    });
    return !!answer;
  } catch (error) {
    console.error("Error retrieving answer for user:", error);
    return false;
  }
};
