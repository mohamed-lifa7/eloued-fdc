import Sidebar from "@/components/admin/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden justify-between w-full">
        <Sidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </>
  );
}
