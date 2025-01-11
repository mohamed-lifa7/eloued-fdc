"use server";

import { AnswerSchema, CodeSubmissionSchema } from "@/schemas";
import { currentUser } from "@/server/auth";
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

    const { quizId, score } = validatedFields.data;

    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    const existingAnswer = await db.answer.findFirst({
      where: {
        userId: crntUser.id,
        quizId,
      },
    });

    if (existingAnswer) {
      return {
        error: "You have already submitted an answer for this question.",
      };
    }
    console.log(existingAnswer);
    // Use a transaction for creating the answer and updating reputation
    await db.$transaction(async (tx) => {
      // Create the answer
      await tx.answer.create({
        data: {
          userId: crntUser.id!,
          quizId: quizId!,
          score,
        },
      });

      // Update user reputation
      await tx.user.update({
        where: { id: crntUser.id },
        data: {
          reputation: { increment: score },
        },
      });
    });

    return { success: "Answer submitted successfully!" };
  } catch (error) {
    console.error("Error submitting answer", error);
    return { error: "Failed to submit answer." };
  }
};

/**
 * Update an answer by ID.
 *
 * @param id - The ID of the answer.
 * @param values - The values to update.
 * @returns An object with either a success message or an error message.
 */
export const updateAnswer = async (
  id: string,
  values: Partial<z.infer<typeof AnswerSchema>>,
) => {
  try {
    const validatedFields = AnswerSchema.partial().safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid answer data!" };
    }

    const updatedAnswer = await db.answer.update({
      where: { id },
      data: validatedFields.data,
    });

    return { success: "Answer updated successfully!", data: updatedAnswer };
  } catch (error) {
    console.error("Error updating answer:", error);
    return { error: "Failed to update answer." };
  }
};

/**
 * Delete an answer by ID.
 *
 * @param id - The ID of the answer.
 * @returns An object with either a success message or an error message.
 */
export const deleteAnswer = async (id: string) => {
  try {
    await db.answer.delete({
      where: { id },
    });

    return { success: "Answer deleted successfully!" };
  } catch (error) {
    console.error("Error deleting answer:", error);
    return { error: "Failed to delete answer." };
  }
};

/**
 * Submit an answer to a coding challenge.
 *
 * @param values - The values for the answer submission.
 * @returns An object with either a success message or an error message.
 */
export const submitCodeQuestionAnswer = async (
  values: z.infer<typeof CodeSubmissionSchema>,
) => {
  try {
    const validatedFields = CodeSubmissionSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid answer data!" };
    }

    const { code, codeQuestionId } = validatedFields.data;

    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    const existingAnswer = await db.codeSubmission.findFirst({
      where: {
        userId: crntUser.id,
        codeQuestionId,
      },
    });
    console.log("existing ==========>", validatedFields.data);

    if (existingAnswer) {
      return {
        error: "You have already submitted an answer for this question.",
      };
    }

    await db.codeSubmission.create({
      data: {
        userId: crntUser.id!,
        codeQuestionId,
        code,
        result:
          "Not reviewed yet. Please wait until the admin reviews your submission.",
        score: 0,
      },
    });

    return { success: "Answer submitted successfully!" };
  } catch (error) {
    console.error("Error submitting answer", error);
    return { error: "Failed to submit answer." };
  }
};
