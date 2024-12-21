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
  Link,
  Button,
  Divider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import { Icons } from "@/components/icons";
import ModeToggle from "../theme/mode-toggle";

const menuItems = [
  {
    title: "الرئيسية",
    href: "/",
  },
  {
    title: "المدونة",
    href: "/blogs",
  },
  {
    title: "اتصل بنا",
    href: "/contact",
  },
];

export default function Siteheader(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      {...props}
      isBlurred
      classNames={{
        base: cn("shadow-sm dark:border dark:border-white/90", {
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
              href={`/${item.href}`}
              size="sm"
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 flex gap-2">
          <Button variant="light">
            تسجيل الدخول
          </Button>
          <Button
            className="font-medium text-white"
            color="secondary"
            endContent={<Icon icon="solar:alt-arrow-left-linear" />}
            variant="solid"
          >
            ابدأ الآن
          </Button>
        </NavbarItem>
        <NavbarMenuItem>
          <ModeToggle />
        </NavbarMenuItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md dark:bg-default-100/50">
        <NavbarMenuItem>
          <Button
            fullWidth
            as={Link}
            href="/login"
            variant="faded"
            color="secondary"
          >
            تسجيل الدخول
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem className="mb-4">
          <Button fullWidth as={Link} color="primary" href="/start">
            ابدأ الآن
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ModeToggle />
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.href}>
            <Link
              className="mb-2 w-full text-default-500 hover:text-foreground"
              href={`/${item.href}`}
              size="md"
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
