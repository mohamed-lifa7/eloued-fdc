"use server";

import { CodeQuestionSchema, quizSchema } from "@/schemas";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import { UserRole, type Question } from "@prisma/client";
import type { z } from "zod";

export async function createQuiz(formData: FormData) {
  const rawData = {
    assignmentId: formData.get("assignmentId"),
    questions: JSON.parse(formData.get("questions") as string) as Question[],
  };

  const validatedData = quizSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { assignmentId, questions } = validatedData.data;

  try {
    // Create the new assignment
    await db.quiz.create({
      data: {
        assignmentId,
        questions: {
          create: questions.map((question) => ({
            content: question.content,
            options: question.options,
            correctOption: question.options[Number(question.correctOption)]!,
          })),
        },
      },
    });

    return { success: "Quiz created successfully!" };
  } catch (error) {
    console.error("Failed to create quiz:", error);
    return { error: "Failed to create quiz" };
  }
}

/**
 * Delete a quiz.
 *
 * @param id - The ID of the quiz to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteQuiz = async (id: string) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to delete quizzes!" };
    }

    await db.quiz.delete({
      where: { id },
    });

    return { success: "Quiz deleted successfully!" };
  } catch (error) {
    console.error("Error deleting quiz", error);
    return { error: "Failed to delete quiz." };
  }
};

/**
 * create new code question.
 *
 * @param values - The new values for the code question.
 * @returns An object with either a success message or an error message.
 */
export async function createCodeQuestion(
  values: z.infer<typeof CodeQuestionSchema>,
) {
  try {
    const validatedFields = CodeQuestionSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid code question data!" };
    }

    const { description, assignmentId, difficulty, maxScore, title } =
      validatedFields.data;

    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    await db.codeQuestion.create({
      data: {
        assignmentId,
        title,
        description,
        difficulty,
        maxScore,
      },
    });

    return { success: "Code question created successfully!" };
  } catch (error) {
    console.error("Error creating code question", error);
    return { error: "Failed to create code question." };
  }
}

/**
 * Delete a code question.
 *
 * @param id - The ID of the code question to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteCodeQuestion = async (id: string) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    if (crntUser.role !== UserRole.ADMIN && crntUser.role !== UserRole.OWNER) {
      return { error: "You do not have permission to delete code questions!" };
    }

    await db.codeQuestion.delete({
      where: { id },
    });

    return { success: "Code question deleted successfully!" };
  } catch (error) {
    console.error("Error deleting code question", error);
    return { error: "Failed to delete code question." };
  }
};
