import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { type CodeSubmission, Difficulty } from "@prisma/client";

interface ChallengeCardProps {
  id: string;
  title: string;
  createdAt: Date;
  assignment: string;
  difficulty: Difficulty;
  answer: CodeSubmission | null;
  maxScore: number;
}

export function ChallengeCard({
  id,
  assignment,
  title,
  createdAt,
  difficulty,
  maxScore,
  answer,
}: ChallengeCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(createdAt);

  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Badge
            variant={
              difficulty == Difficulty.EASY
                ? "success"
                : difficulty == Difficulty.HARD
                  ? "outline"
                  : "destructive"
            }
          >
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {answer ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span>Your Scored</span>
              <span className="font-semibold">{answer.score}</span>
              <span>Points</span>
            </div>
            <Badge className="flex items-center space-x-2">
              <span>Solved</span> <CheckCircle className="h-4 w-4" />
            </Badge>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{maxScore}</span>
              <span className="text-sm text-gray-500">Max score</span>
            </div>
            <Badge className="flex items-center space-x-2" variant="secondary">
              <span>Not Solved</span>
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/assignments/${assignment}/${id}`}>
            <span className="flex items-center justify-center">
              Start Challenge
              <ChevronRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
