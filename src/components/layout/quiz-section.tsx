"use client";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/types/quiz";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export const QuizSection: React.FC<{ quizData: QuizData }> = ({ quizData }) => {
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
        Test Your Abilities?
      </h2>
      <p className="text-lg md:w-full">
        Challenge yourself and discover your skills in minutes!
      </p>

      <div className="grid place-content-center">
        <h3 className="text-lg font-bold"> Quiz: {quizData.topic}</h3>
        <h3 className="text-lg">Level: {quizData.level}</h3>
        {showScore ? (
          <div className="grid place-content-center space-y-6">
            <h4
              className={cn(
                score == quizData.totalQuestions * quizData.perQuestionScore
                  ? "border-success text-success"
                  : "border-warning text-warning",
                "w-full border p-10",
              )}
            >
              Your Score: {score} /{" "}
              {quizData.totalQuestions * quizData.perQuestionScore}
            </h4>
            <Button onClick={restartQuiz} color="primary">
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div className="shodow-md flex flex-col items-center p-4 shadow-lg dark:shadow-foreground-50/60 md:p-10">
            <h3>{quizData.questions[currentQuestion]?.question}</h3>
            <ul className="my-4 flex w-full flex-col justify-between space-y-2">
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
              Question {currentQuestion + 1} of {quizData.totalQuestions}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
