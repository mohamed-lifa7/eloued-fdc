export const quiz = {
  topic: "JavaScript",
  level: "Beginner",
  totalQuestions: 4,
  perQuestionScore: 5,
  questions: [
    {
      question:
        "What is the function used to convert an object to a JSON string in JavaScript?",
      choices: ["stringify()", "parse()", "convert()", "None of the above"],
      type: "Multiple Choice",
      correctAnswer: "stringify()",
    },
    {
      question:
        "Which of the following keywords is used to define a variable in JavaScript?",
      choices: ["var", "let", "var and let", "None of the above"],
      type: "Multiple Choice",
      correctAnswer: "var and let",
    },
    {
      question:
        "Which of the following methods can be used to display data using JavaScript?",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "All of the above",
      ],
      type: "Multiple Choice",
      correctAnswer: "All of the above",
    },
    {
      question: "How can you define a data type to be constant?",
      choices: ["const", "var", "let", "constant"],
      type: "Multiple Choice",
      correctAnswer: "const",
    },
  ],
};

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
