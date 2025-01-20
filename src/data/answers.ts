import { currentUser } from "@/server/auth";
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
 * Retrieves the count of answers from the database.
 * @returns The count of answers as a number.
 */
export const getCodeQuestionsSubmissionsCount = async () => {
  try {
    const count = await db.codeSubmission.count();
    return count;
  } catch (error) {
    console.error("Error retrieving code questions submissions count:", error);
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
 * Retrieves all answers for a specific code question from the database.
 * @param codeQuestionId - The ID of the code question to retrieve answers for.
 * @returns A promise that resolves to an array of answers, or an empty array if an error occurs.
 */
export const getCodeQuestionWithAnswers = async (codeQuestionId: string) => {
  try {
    const codeQuestion = await db.codeQuestion.findUnique({
      where: { id: codeQuestionId },
      include: {
        submissions: true, // Include related submissions in the result
      },
    });
    return codeQuestion;
  } catch (error) {
    console.error("Error retrieving code question with answers:", error);
    return null;
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
 * Retrieves an answer by its userId and quizId.
 * @param params - An object containing the following parameters:
 * @param params.quizId - The ID of the quiz to check submissions for.
 * @returns A promise that resolves to answer if the user has submitted an answer, null otherwise.
 */
export const getSubmittedAnswer = async ({ quizId }: { quizId: string }) => {
  try {
    const crntUser = await currentUser();

    if (!currentUser) return null;

    const answer = await db.answer.findFirst({
      where: {
        userId: crntUser?.id,
        quizId,
      },
    });
    return answer;
  } catch (error) {
    console.error("Error retrieving answer for user:", error);
    return null;
  }
};

/**
 * Retrieves an answer by its userId and codeQuestionId.
 * @param params - An object containing the following parameters:
 * @param params.codeQuestionId - The ID of the quiz to check submissions for.
 * @returns A promise that resolves to answer if the user has submitted an answer, null otherwise.
 */
export const getSubmittedCodeQuestion = async ({
  codeQuestionId,
}: {
  codeQuestionId: string;
}) => {
  try {
    const crntUser = await currentUser();

    if (!currentUser) return null;

    const answer = await db.codeSubmission.findFirst({
      where: {
        codeQuestionId,
        userId: crntUser?.id,
      },
    });
    return answer;
  } catch (error) {
    console.error("Error retrieving answer for user:", error);
    return null;
  }
};
