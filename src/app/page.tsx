import AboutSection from "@/components/layout/about-section";
import Hero from "@/components/layout/hero-section";
import Projects from "@/components/layout/projects-sections";
// import { Community } from "@/components/layout/community-section";
// import { QuizSection } from "@/components/layout/quiz-section";
// import { quiz } from "@/data/quizes";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      {/* <QuizSection quizData={quiz} /> */}
      <Projects />
      {/* <Community /> */}
    </main>
  );
}
