"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Star, Code, MessageCircle } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  image: string | null;
  faculty: string | null;
  reputation: number;
  createdAt: Date;
  _count: {
    Answer: number;
    CodeSubmission: number;
  };
}

interface LeaderboardProps {
  users: User[];
}

// Define dynamic rank thresholds based on reputation points
const getUserRank = (reputation: number) => {
  if (reputation <= 50) return { rank: "Beginner", color: "bg-gray-500" };
  if (reputation <= 150) return { rank: "Intermediate", color: "bg-green-500" };
  if (reputation <= 300) return { rank: "Advanced", color: "bg-blue-500" };
  if (reputation <= 500) return { rank: "Expert", color: "bg-purple-500" };
  return { rank: "Master", color: "bg-yellow-500" };
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-400" />;
    case 2:
      return <Medal className="h-8 w-8 text-gray-400" />;
    case 3:
      return <Award className="h-8 w-8 text-amber-600" />;
    default:
      return <Star className="h-6 w-6 text-blue-400" />;
  }
};

export function Leaderboard({ users }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<
    "reputation" | "answers" | "submissions"
  >("reputation");

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "reputation") return b.reputation - a.reputation;
    if (sortBy === "answers") return b._count.Answer - a._count.Answer;
    return b._count.CodeSubmission - a._count.CodeSubmission;
  });

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">User Leaderboard</h2>
          <div className="space-x-2">
            <Button
              variant={sortBy === "reputation" ? "default" : "outline"}
              onClick={() => setSortBy("reputation")}
            >
              Reputation
            </Button>
            <Button
              variant={sortBy === "answers" ? "default" : "outline"}
              onClick={() => setSortBy("answers")}
            >
              Answers
            </Button>
            <Button
              variant={sortBy === "submissions" ? "default" : "outline"}
              onClick={() => setSortBy("submissions")}
            >
              Submissions
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {sortedUsers.map((user, index) => {
            const { rank, color } = getUserRank(user.reputation);

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="w-12 flex-shrink-0 text-center">
                      {getRankIcon(index + 1)}
                      <span className="text-sm font-semibold">
                        #{index + 1}
                      </span>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.image ?? "/placeholder.svg"}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="font-semibold">
                        {user.name ?? "Anonymous"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.faculty ?? "N/A"}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={`${color} text-white`}
                      >
                        {rank}
                      </Badge>
                      <div className="flex flex-col items-end">
                        <div className="font-semibold">
                          {user.reputation} Rep
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MessageCircle className="mr-1 h-4 w-4" />{" "}
                          {user._count.Answer}
                          <Code className="ml-2 mr-1 h-4 w-4" />{" "}
                          {user._count.CodeSubmission}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
