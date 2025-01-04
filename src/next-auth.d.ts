import type { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  bio?: string;
  studentId: string;
  faculty?: string;
  birthday?: Date;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
