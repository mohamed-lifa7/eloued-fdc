"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitAnswer } from "@/actions/answers";
import { toast } from "sonner";

interface QuizCardProps {
  questionNumber: number;
  totalQuestions: number;
  question?: string;
  options?: string[];
  correctAnswer?: string;
  quizId: string;
  disabled: boolean;
  onNextQuestion: () => void;
}

export function QuizCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  correctAnswer,
  quizId,
  disabled,
  onNextQuestion,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
      if (selectedAnswer == correctAnswer) {
        if (selectedAnswer === correctAnswer) {
          setScore((prevScore) => {
            const newScore = prevScore + 5;
            return newScore;
          });
        }
      }
    }
  };
  const handleFinish = () => {
    handleSubmit();
    startTransition(() => {
      submitAnswer({ score: score, quizId: quizId })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    onNextQuestion();
  };

  return (
    <Card className="mx-auto w-full max-w-lg overflow-hidden" aria-disabled={disabled}>
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center justify-between">
          Question {questionNumber} of {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-lg font-medium">{question}</p>
          <RadioGroup
            value={selectedAnswer ?? ""}
            onValueChange={setSelectedAnswer}
            className="space-y-2"
          >
            {options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-lg p-3"
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  disabled={isAnswered || disabled}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                  aria-disabled={disabled}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {questionNumber < totalQuestions ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer || isAnswered || isPending || disabled}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            variant="primary2"
            onClick={handleFinish}
            disabled={!selectedAnswer || isAnswered || isPending || disabled}
          >
            Finish
          </Button>
        )}
        {questionNumber < totalQuestions && (
          <Button
            onClick={handleNext}
            disabled={!isAnswered || isPending || disabled}
            variant="outline"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
