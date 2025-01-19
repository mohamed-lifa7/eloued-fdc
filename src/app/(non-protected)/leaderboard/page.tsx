import { getLeaderboardData } from "@/data/user";
import { Leaderboard } from "./leaderboard-client";

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();
  return (
    <main className="container my-20 min-h-screen max-w-4xl space-y-8">
      <Leaderboard users={leaderboardData} />
    </main>
  );
}
