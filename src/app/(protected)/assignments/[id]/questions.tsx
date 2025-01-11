"use client";

import { useState } from "react";
import { QuizCard } from "./question";
import type { Question } from "@prisma/client";

export default function QuizPage({
  questions,
  quizId,
  disabled,
}: {
  questions: Question[];
  quizId: string;
  disabled: boolean;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Quiz Complete"); // Replace this with your desired behavior.
    }
  };

  return (
    <QuizCard
      disabled={disabled}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      question={questions[currentQuestionIndex]?.content}
      options={questions[currentQuestionIndex]?.options}
      correctAnswer={questions[currentQuestionIndex]?.correctOption}
      quizId={quizId}
      onNextQuestion={handleNextQuestion}
    />
  );
}
