import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md py-12">
        <h1 className="text-9xl font-extrabold">
          <span className="text-primary dark:text-destructive">4</span>
          <span className="text-destructive dark:text-white">0</span>
          <span className="text-primary dark:text-destructive">3</span>
        </h1>
        <h2 className="text-4xl font-extrabold">Access Denied</h2>
        <p className="mt-2 text-lg text-[var(--primary)] dark:text-[var(--destructive)]">
          You do not have permission to view this page.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button>Back to Home Page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
