"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { type QuestionSchema } from "@/schemas";
import { type z } from "zod";
import { createQuiz } from "@/actions/quizzes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CreateQuizForm({ assignmentId }: { assignmentId: string }) {
  const [questions, setQuestions] = useState<z.infer<typeof QuestionSchema>[]>(
    [],
  );
  const [currentQuestion, setCurrentQuestion] = useState<
    z.infer<typeof QuestionSchema>
  >({
    id: uuidv4(),
    content: "",
    options: ["", ""],
    correctOption: "",
    assignmentId,
  });

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const updateOption = (index: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const removeOption = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      correctOption:
        prev.correctOption === index.toString() ? "" : prev.correctOption,
    }));
  };

  const addQuestion = () => {
    if (
      currentQuestion.content &&
      currentQuestion.options.length >= 2 &&
      currentQuestion.correctOption
    ) {
      setQuestions((prev) => [...prev, currentQuestion]);
      setCurrentQuestion({
        id: uuidv4(),
        content: "",
        options: ["", ""],
        correctOption: "",
        assignmentId,
      });
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) return;

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("questions", JSON.stringify(questions));

    const result = await createQuiz(formData);

    if (result.success) {
      toast.success(result.success);
    } else {
      toast.success(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn(questions.length>0 ? "space-y-8":"", "h-full")}>
      <div className="space-y-4 ">
        {questions.map((q, index) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle>Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{q.content}</p>
              <ul className="mt-2 space-y-1">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    className={
                      i.toString() === q.correctOption ? "font-bold" : ""
                    }
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeQuestion(q.id)}
              >
                Remove Question
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="question-content">Question</Label>
            <Input
              id="question-content"
              value={currentQuestion.content}
              onChange={(e) =>
                setCurrentQuestion((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              placeholder="Enter your question here"
            />
          </div>

          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeOption(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addOption}>
            Add Option
          </Button>

          <div>
            <Label>Correct Option</Label>
            <RadioGroup
              value={currentQuestion.correctOption}
              onValueChange={(value) =>
                setCurrentQuestion((prev) => ({
                  ...prev,
                  correctOption: value,
                }))
              }
            >
              {currentQuestion.options.map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button type="button" variant="outline" onClick={addQuestion}>
            Add Question
          </Button>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={questions.length === 0}
            className="w-full"
          >
            Create Quiz
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
