import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md py-12">
        <h1 className="text-9xl font-extrabold">
          <span className="text-primary">4</span>
          <span className="text-destructive">0</span>
          <span className="text-primary">4</span>
        </h1>
        <p className="mt-2 text-lg text-[var(--primary)] dark:text-[var(--destructive)]">
          Sorry! It looks like you clicked on an incorrect link.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button>Return to Home Page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
