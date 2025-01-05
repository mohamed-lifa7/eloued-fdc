"use server";

import { AnswerSchema } from "@/schemas";
import { db } from "@/server/db";
import type { z } from "zod";

/**
 * Submit an answer to a question or coding challenge.
 *
 * @param values - The values for the answer submission.
 * @returns An object with either a success message or an error message.
 */
export const submitAnswer = async (values: z.infer<typeof AnswerSchema>) => {
  try {
    const validatedFields = AnswerSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid answer data!" };
    }

    const { userId, questionId, codeSolution, isCorrect } =
      validatedFields.data;

    // Create the answer
    await db.answer.create({
      data: {
        userId,
        questionId,
        codeSolution,
        isCorrect
      },
    });

    return { success: "Answer submitted successfully!" };
  } catch (error) {
    console.error("Error submitting answer", error);
    return { error: "Failed to submit answer." };
  }
};
