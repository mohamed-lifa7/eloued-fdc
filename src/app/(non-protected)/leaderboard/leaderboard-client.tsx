"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Star, Code, MessageCircle } from "lucide-react";
import Link from "next/link";
import { faculties } from "@/config/univ-config";
import { getRank } from "@/lib/utils";

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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
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
            const rank = getRank(user.reputation);

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="flex items-center space-x-2 text-center">
                      <span className="text-lg font-semibold">
                        #{index + 1}
                      </span>
                      {getRankIcon(index + 1)}
                    </div>
                    <Link
                      href={`https://www.futuredev.club/profile/${user.id}`}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user.image!}
                          alt={user.name?.slice(0, 2).toUpperCase()}
                        />
                        <AvatarFallback>
                          {user.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-grow">
                      <div className="font-semibold">
                        <Link
                          href={`https://www.futuredev.club/profile/${user.id}`}
                        >
                          {user.name ?? "Anonymous"}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">
                        {faculties[user.faculty as keyof typeof faculties]}
                      </div>
                    </div>
                    <div className="hidden items-center space-x-2 md:flex">
                      <Badge
                        variant={
                          rank == "Beginner"
                            ? "secondary"
                            : rank == "Intermediate"
                              ? "success"
                              : rank == "Advanced"
                                ? "outline"
                                : "destructive"
                        }
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
