import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    bio: z.optional(z.string().max(300)),
    faculty: z.optional(z.string()),
    birthday: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "The minimum required number of characters is 6",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "The minimum required number of characters is 6",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const UpdateUserSchema = z.object({
  name: z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.OWNER]),
});

export const ContactFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(2).max(500),
});

export const EventSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  imageUrl: z.string().url(),
  status: z.string().min(2).max(20),
  location: z.string().min(2).max(100),
  startDate: z.date(),
  endDate: z.date(),
});

export const AssignmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  eventId: z.string(),
});

export const UpdateAssignmentSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const AnswerSchema = z.object({
  userId: z.optional(z.string()),
  quizId: z.optional(z.string()),
  score: z.number().int(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  content: z.string().min(1, "Question content is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required"),
  correctOption: z.string(),
  assignmentId: z.string(),
});

export const CodeQuestionSchema = z.object({
  description: z.string(),
  assignmentId: z.string(),
});

export const CodeSubmissionSchema = z.object({
  userId: z.string(),
  codeQuestionId: z.string(),
  code: z.string(),
  result: z.string(),
  score: z.number().int().nullable(),
});
