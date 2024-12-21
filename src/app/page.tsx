import Community from "@/components/layout/community";
import Hero from "@/components/layout/hero-section";
import { Quiz } from "@/components/layout/quiz-section";
import { quiz } from "@/data/quizes";

export default function Home() {
  return (
    <main>
      <Hero />
      <Community />
      <Quiz quizData={quiz} />
    </main>
  );
}
