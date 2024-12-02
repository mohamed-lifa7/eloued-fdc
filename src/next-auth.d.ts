import type { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
