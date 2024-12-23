import AboutSection from "@/components/layout/about-section";
import { Community } from "@/components/layout/community-section";
import Hero from "@/components/layout/hero-section";
import { QuizSection } from "@/components/layout/quiz-section";
import { quiz } from "@/data/quizes";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <QuizSection quizData={quiz} />
      <Community />
    </main>
  );
}
