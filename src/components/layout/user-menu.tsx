"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LifeBuoy, LogOut, User, UserCog } from "lucide-react";
import { logout } from "@/actions/logout";
import type { ExtendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

const UserMenu = ({ user }: { user: ExtendedUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar className="h-10 w-10 ring-2">
          <AvatarImage
            src={user.image ?? ""}
            alt={user?.name?.[0]?.toUpperCase()}
          />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {user.role === UserRole.ADMIN || user.role === UserRole.OWNER ? (
          <DropdownMenuItem>
            <Link href="/admin" className="flex items-center space-x-2">
              <UserCog className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <></>
        )}
        <DropdownMenuItem>
          <Link href="/contact" className="flex items-center space-x-2">
            <LifeBuoy className="h-4 w-4" />
            <span>Contact us</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            void logout();
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
