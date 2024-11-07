import type { AdminNavItem } from "@/types";

export const navLinks = [
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "Support",
    href: "/support",
  },
];

export const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "users",
    label: "user",
  },
  {
    title: "Tasks",
    href: "/admin/tasks",
    icon: "tasks",
    label: "tasks",
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/admin/kanban",
    icon: "kanban",
    label: "kanban",
  },
];
