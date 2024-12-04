import { Button } from "@nextui-org/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto py-12">
                <h1 className="text-9xl font-extrabold text-black dark:text-white">
                    <span className="text-[var(--primary)] dark:text-[var(--destructive)]">4</span>
                    <span className="text-[var(--destructive)] dark:text-white">0</span>
                    <span className="text-[var(--primary)] dark:text-[var(--destructive)]">4</span>
                </h1>
                <p className="mt-2 text-lg text-[var(--primary)] dark:text-[var(--destructive)]">
                    عذراً! يبدو أنك ضغطت على رابط غير صحيح.
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                    >
                        <Button>
                            العودة إلى الصفحة الرئيسية
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}