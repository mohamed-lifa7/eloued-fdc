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

const menuItems = [
  "الرئيسية",
  "المدونة",
  "اتصل بنا",
];

export default function Siteheader(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <div className="rounded-full bg-foreground text-background">
          <Icons.logo />
        </div>
        <span className="ml-2 text-small font-medium">FDC</span>
      </NavbarBrand>

      <NavbarContent justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              className="text-default-500 hover:text-foreground"
              href={`/${item}`}
              size="sm"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 flex gap-2">
          <Button className="text-default-500" radius="full" variant="light">
            تسجيل الدخول
          </Button>
          <Button
            className="bg-foreground font-medium text-background"
            color="secondary"
            endContent={<Icon icon="solar:alt-arrow-left-linear" />}
            radius="full"
            variant="flat"
          >
            ابدأ الآن
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md dark:bg-default-100/50">
        <NavbarMenuItem>
          <Button fullWidth as={Link} href="/login" variant="faded">
            تسجيل الدخول
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem className="mb-4">
          <Button
            fullWidth
            as={Link}
            className="bg-foreground text-background"
            href="/start"
          >
            ابدأ الآن
          </Button>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="mb-2 w-full text-default-500 hover:text-foreground"
              href={`/${item}`}
              size="md"
            >
              {item}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}