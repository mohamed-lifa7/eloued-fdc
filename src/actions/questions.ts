"use server";

import type { z } from "zod";
import { db } from "@/server/db";
import { CodeQuestionSchema, QuestionSchema } from "@/schemas";

/**
 * Create a new question.
 *
 * @param values - The values for the new question.
 * @returns An object with either a success message or an error message.
 */
export const createQuestion = async (
  values: z.infer<typeof QuestionSchema>,
) => {
  try {
    // Validate input fields using the QuestionSchema
    const validatedFields = QuestionSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid question data!" };
    }

    const { assignmentId, content, correctOption, options } =
      validatedFields.data;

    // Create the new question
    await db.question.create({
      data: {
        assignmentId,
        content,
        correctOption,
        options,
      },
    });

    return { success: "Question created successfully!" };
  } catch (error) {
    console.error("Error creating question", error);
    return { error: "Failed to create question. Please try again." };
  }
};

/**
 * Create a new code question.
 *
 * @param values - The values for the new code question.
 * @returns An object with either a success message or an error message.
 */
export const createCodeQuestion = async (
  values: z.infer<typeof CodeQuestionSchema>,
) => {
  try {
    // Validate input fields using the CodeQuestionSchema
    const validatedFields = CodeQuestionSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid question data!" };
    }

    const {
      assignmentId,
      description,
      exampleInput,
      exampleOutput,
      constraints,
    } = validatedFields.data;

    // Create the new question
    await db.codeQuestion.create({
      data: {
        assignmentId,
        description,
        constraints,
        exampleInput,
        exampleOutput,
      },
    });

    return { success: "Question created successfully!" };
  } catch (error) {
    console.error("Error creating question", error);
    return { error: "Failed to create question. Please try again." };
  }
};
