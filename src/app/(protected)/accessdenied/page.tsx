import { Button } from "@nextui-org/button"
import Link from "next/link"

export default function AccessDenied() {
    return (
        <main className="min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto py-12">
                <h1 className="text-9xl font-extrabold">
                    <span className="text-primary dark:text-destructive">4</span>
                    <span className="text-destructive dark:text-white">0</span>
                    <span className="text-primary dark:text-destructive">3</span>
                </h1>
                <h2 className="text-4xl font-extrabold">تم رفض الوصول</h2>
                <p className="mt-2 text-lg text-[var(--primary)] dark:text-[var(--destructive)]">
                ليس لديك الأذونات اللازمة لعرض هذه الصفحة.
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