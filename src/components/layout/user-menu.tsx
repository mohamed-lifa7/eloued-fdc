"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { LifeBuoy, LogOut, User, UserCog } from "lucide-react";
import { logout } from "@/actions/logout";
import type { ExtendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

const UserMenu = ({ user }: { user: ExtendedUser }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <Avatar
          src={user.image ?? ""}
          isBordered
          color="primary"
          showFallback
          size="sm"
          radius="md"
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection title={user.name!}>
          <DropdownItem>
            <Link href="/profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>الملف الشخصي</span>
            </Link>
          </DropdownItem>
          {user.role === UserRole.ADMIN ? (
            <DropdownItem>
              <Link href="/admin" className="flex items-center space-x-2">
                <UserCog className="h-4 w-4" />
                <span>لوحة تحكم المشرف</span>
              </Link>
            </DropdownItem>
          ) : (
            <></>
          )}
          <DropdownItem>
            <Link href="/contact" className="flex items-center space-x-2">
              <LifeBuoy className="h-4 w-4" />
              <span>اتصل بنا</span>
            </Link>
          </DropdownItem>
          <DropdownItem
            onAction={() => {
              void logout();
            }}
          >
            <div className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
