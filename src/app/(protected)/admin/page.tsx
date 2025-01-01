import { Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUsersCount } from "@/data/user";
import { getContactFormsCount } from "@/data/contact";

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
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
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
                  <div className="text-2xl font-bold">{data.allUsersCount}</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% from last month
                  </p>
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
                    {data.ContactFormsCount}
                  </div>
                </CardContent>
              </Card>

              {/* Completed Projects */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">Completed Projects</h2>
                  <CheckCircle />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.completedProjectsCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              {/* Average Event Duration */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">
                    Average Event Duration
                  </h2>
                  <Clock />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.avgEventDuration} hours
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

async function getData() {
  const allUsersCount = await getUsersCount();
  const completedProjectsCount = 600;
  const ContactFormsCount = await getContactFormsCount();
  const avgEventDuration = 15.2;
  return {
    allUsersCount,
    completedProjectsCount,
    avgEventDuration,
    ContactFormsCount,
  };
}
