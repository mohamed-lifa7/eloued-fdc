"use client";

import type { NavbarProps } from "@nextui-org/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Divider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import { Icons } from "@/components/icons";
import ModeToggle from "../theme/mode-toggle";
import UserMenu from "./user-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

export default function Siteheader(props: NavbarProps) {
  const user = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      {...props}
      isBlurred
      classNames={{
        base: cn("shadow-sm dark:shadow-foreground-50", {
          "bg-default-200/50 dark:bg-default-100/50 ": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Link href="/">
          <Icons.logo className="w-h-14 h-14" />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className="text-default-500 hover:text-foreground"
              href={`${item.href}`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 flex items-center gap-2">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button
              variant="light"
              as={Link}
              href="/auth/login"
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
            >
              Log in
            </Button>
          )}
        </NavbarItem>
        <NavbarMenuItem>
          <ModeToggle />
        </NavbarMenuItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md dark:bg-default-100/50">
        <div className="mb-8 flex items-center space-x-4">
          <NavbarMenuItem>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Button
                variant="light"
                as={Link}
                href="/auth/login"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              >
                Log in{" "}
              </Button>
            )}
          </NavbarMenuItem>
          <NavbarMenuItem>
            <ModeToggle />
          </NavbarMenuItem>
        </div>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.href}>
            <Link
              className="mb-2 w-full text-default-500 hover:text-foreground"
              href={`${item.href}`}
            >
              {item.title}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
