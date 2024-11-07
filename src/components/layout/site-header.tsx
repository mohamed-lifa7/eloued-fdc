import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import UserMenu from "@/components/user/user-menu";
import { currentUser } from "@/server/auth";

export async function SiteHeader() {
  const user = await currentUser();
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent shadow-sm backdrop-blur supports-[backdrop-filter]:bg-transparent dark:border-b">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {user && <UserMenu user={user} />}
          </nav>
        </div>
      </div>
    </header>
  );
}
