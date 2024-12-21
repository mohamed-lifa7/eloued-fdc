"use client";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/types/quiz";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export const Quiz: React.FC<{ quizData: QuizData }> = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === quizData.questions[currentQuestion]?.correctAnswer) {
      setScore((prevScore) => prevScore + quizData.perQuestionScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <section className="container space-y-4 p-4 text-center">
      <h2 className="text-pretty text-3xl font-bold md:text-4xl">
        اختبر قدراتك؟
      </h2>
      <div>
        <h3 className="text-xl font-bold"> اختبار {quizData.topic}</h3>
        <h3 className="text-lg">المستوى: {quizData.level}</h3>
        {showScore ? (
          <div className="grid place-content-center space-y-6">
            <h4
              className={cn(
                score == quizData.totalQuestions * quizData.perQuestionScore
                  ? "text-success"
                  : "text-warning",
                "w-full p-10 shadow-md",
              )}
            >
              نتيجتك: {score} /{" "}
              {quizData.totalQuestions * quizData.perQuestionScore}
            </h4>
            <Button onClick={restartQuiz} color="primary">
              إعادة تشغيل الاختبار
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h3>{quizData.questions[currentQuestion]?.question}</h3>
            <ul className="mt-4 flex w-64 flex-col justify-between space-y-2">
              {quizData.questions[currentQuestion]?.choices.map(
                (choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(choice)}
                    dir="ltr"
                  >
                    {choice}
                  </Button>
                ),
              )}
            </ul>
            <p className="mt-2">
              السؤال {currentQuestion + 1} من {quizData.totalQuestions}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
