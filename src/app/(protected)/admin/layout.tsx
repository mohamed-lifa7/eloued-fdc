import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Welcome to the admin dashboard page for management.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="container w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
