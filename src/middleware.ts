import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  adminPrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { authConfig } from "./server/auth/config";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth((req): void | Response | Promise<void | Response> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin =
    isLoggedIn &&
    (req.auth?.user.role == UserRole.ADMIN ||
      req.auth?.user.role == UserRole.OWNER);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/blogs") ||
    nextUrl.pathname.startsWith("/tags") ||
    nextUrl.pathname.startsWith("/profile");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix);

  if (isApiAuthRoute) {
    return void 0;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return void 0;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  if (isAdminRoute) {
    if (isAdmin) {
      return void 0;
    }
    return Response.redirect(new URL("/accessdenied", nextUrl));
  }

  return void 0;
});

// Optionally, don't invoke Middleware on some paths 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
