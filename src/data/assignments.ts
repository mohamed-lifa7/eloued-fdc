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

/**
 * Retrieves the count of assignments from the database.
 * @returns {Promise<number>} The count of assignments.
 */
export const getAssignmentsCount = async () => {
  const count = await db.assignment.count();
  return count;
};

/**
 * Retrieves an overview of assignments, including the count of quizzes and code questions for each.
 * @returns A list of assignments with their title, quiz count, and code question count.
 */
export async function getAssignmentOverviewData() {
  return db.assignment
    .findMany({
      select: {
        title: true,
        _count: {
          select: {
            quizzes: true,
            codeQuestions: true,
          },
        },
      },
    })
    .then((assignments) =>
      assignments.map((a) => ({
        title: a.title,
        quizCount: a._count.quizzes,
        codeQuestionCount: a._count.codeQuestions,
      })),
    );
}

/**
 * Retrieves performance data for quizzes, including average, min, max scores, and submission counts.
 * @returns A list of quizzes with performance metrics.
 */
export async function getQuizPerformanceData() {
  return db.quiz
    .findMany({
      select: {
        id: true,
        assignment: {
          select: {
            title: true,
          },
        },
        answers: {
          select: {
            score: true,
          },
        },
      },
    })
    .then((quizzes) =>
      quizzes.map((q) => {
        const scores = q.answers.map((a) => a.score);
        return {
          quizTitle: `${q.assignment.title} - Quiz ${q.id.slice(-4)}`,
          averageScore: scores.length
            ? scores.reduce((a, b) => a + b, 0) / scores.length
            : 0,
          minScore: Math.min(...scores, 0),
          maxScore: Math.max(...scores, 0),
          submissionCount: scores.length,
        };
      }),
    );
}

/**
 * Retrieves difficulty distribution for code questions.
 * @returns A list of objects representing difficulty levels and their respective counts.
 */
export async function getCodeQuestionDifficultyData() {
  return db.codeQuestion
    .groupBy({
      by: ["difficulty"],
      _count: {
        _all: true,
      },
    })
    .then((groups) =>
      groups.map((g) => ({
        difficulty: g.difficulty,
        count: g._count._all,
      })),
    );
}

/**
 * Retrieves submission trends data for both quizzes and code questions.
 * @returns An array of objects containing dates, quiz submission counts, and code submission counts.
 */
export async function getUserSubmissionTrendsData() {
  const quizSubmissions = await db.answer.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
  });

  const codeSubmissions = await db.codeSubmission.groupBy({
    by: ["submittedAt"],
    _count: {
      _all: true,
    },
  });

  const allDates = new Set([
    ...quizSubmissions.map((q) => q.createdAt.toISOString().split("T")[0]),
    ...codeSubmissions.map((c) => c.submittedAt.toISOString().split("T")[0]),
  ]);

  return Array.from(allDates)
    .sort()
    .map((date) => ({
      date: date!,
      quizSubmissions:
        quizSubmissions.find(
          (q) => q.createdAt.toISOString().split("T")[0] === date,
        )?._count._all ?? 0,
      codeSubmissions:
        codeSubmissions.find(
          (c) => c.submittedAt.toISOString().split("T")[0] === date,
        )?._count._all ?? 0,
    }));
}
