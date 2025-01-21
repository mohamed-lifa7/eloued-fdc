import { Calendar, CheckCircle, Clock, ListTodo, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRecentUsers, getUserRepuation, getUsersCount } from "@/data/user";
import { getContactFormsCount } from "@/data/contact";
import {
  getAssignmentOverviewData,
  getAssignmentsCount,
  getCodeQuestionDifficultyData,
  getQuizPerformanceData,
  getUserSubmissionTrendsData,
} from "@/data/assignments";
import {
  getAnswersCount,
  getCodeQuestionsSubmissionsCount,
} from "@/data/answers";
import UserReputationSubmissionsChart from "@/components/admin/user-reputation-submissions-chart";
import { RecentSales } from "@/components/admin/recent-sales";
import { Suspense } from "react";
import { AssignmentOverviewChart } from "@/components/admin/assignment-overview-chart";
import { QuizPerformanceChart } from "@/components/admin/quiz-performance-chart";
import { UserSubmissionTrendsChart } from "@/components/admin/user-submission-trends-chart";

export default async function AdminPage() {
  const data = await getData();
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back! 👋{" "}
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">Total Users</h2>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.allUsersCount} users
                  </div>
                </CardContent>
              </Card>

              {/* total contact form count */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">Total Contact Forms</h2>
                  <Calendar />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.contactFormsCount} contact forms
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">Total Assignments</h2>
                  <ListTodo />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.assignmentsCount} assignments
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">Total answers</h2>
                  <CheckCircle />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.answersCount + data.codeQuestionCount} answers
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.answersCount} quizzes answers.
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.codeQuestionCount} code question answers
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col space-x-4 md:flex-row">
              <UserReputationSubmissionsChart userData={data.userData} />
              <RecentSales
                users={data.recentUsers}
                totalUsers={data.allUsersCount}
              />
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-6 p-6">
              <h1 className="text-center text-2xl font-bold md:text-left md:text-3xl">
                Analytics Dashboard
              </h1>
              <div className="space-y-6">
                <Suspense fallback={<div>Loading Assignment Overview...</div>}>
                  <div>
                    <AssignmentOverviewChart data={data.assignmentData} />
                  </div>
                </Suspense>
                <Suspense fallback={<div>Loading Quiz Performance...</div>}>
                  <div>
                    <QuizPerformanceChart data={data.quizData} />
                  </div>
                </Suspense>
                <Suspense
                  fallback={<div>Loading User Submission Trends...</div>}
                >
                  <div>
                    <UserSubmissionTrendsChart data={data.submissionData} />
                  </div>
                </Suspense>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

/**
 * Retrieves various data points, including user counts, assignments, and performance metrics.
 * @returns An object containing aggregated data for users, assignments, quizzes, submissions, and more.
 */
async function getData() {
  try {
    const [
      allUsersCount,
      recentUsers,
      assignmentsCount,
      contactFormsCount,
      answersCount,
      codeQuestionCount,
      userData,
      assignmentData,
      quizData,
      difficultyData,
      submissionData,
    ] = await Promise.all([
      getUsersCount(),
      getRecentUsers(),
      getAssignmentsCount(),
      getContactFormsCount(),
      getAnswersCount(),
      getCodeQuestionsSubmissionsCount(),
      getUserRepuation(),
      getAssignmentOverviewData(),
      getQuizPerformanceData(),
      getCodeQuestionDifficultyData(),
      getUserSubmissionTrendsData(),
    ]);

    return {
      allUsersCount,
      recentUsers,
      assignmentsCount,
      answersCount,
      contactFormsCount,
      codeQuestionCount,
      userData,
      assignmentData,
      quizData,
      difficultyData,
      submissionData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
