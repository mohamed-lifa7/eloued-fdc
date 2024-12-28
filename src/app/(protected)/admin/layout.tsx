import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "صفحة الأدمن",
  description: "مرحبا بك في صفحة الأدمن الخاصة بالإدارة.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full container">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
