"use server";

import { CodeQuestionSchema } from "@/schemas";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import type { Question } from "@prisma/client";
import { z } from "zod";

const questionSchema = z.object({
  content: z.string().min(1, "Question content is required"),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctOption: z.string().min(1, "Correct option is required"),
});

const quizSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

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

    const { description, assignmentId } = validatedFields.data;

    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "You are not signed in. Please sign in and try again" };
    }

    await db.codeQuestion.create({
      data: {
        description,
        assignmentId,
      },
    });

    return { success: "Code question created successfully!" };
  } catch (error) {
    console.error("Error creating code question", error);
    return { error: "Failed to create code question." };
  }
}
