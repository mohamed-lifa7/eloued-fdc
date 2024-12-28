import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AdminPage() {
  const data = await getData();
  return (
    <ScrollShadow className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            مرحبًا، أهلاً بعودتك 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>تحميل</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              التحليلات
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">جميع المستخدمين</h2>
                  <Users />
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold">{data.allUsersCount}</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% من الشهر الماضي
                  </p>
                </CardBody>
              </Card>

              {/* Active Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">الأحداث النشطة</h2>
                  <Calendar />
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold">
                    {data.activeEventsCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.activeEventsCount > 0
                      ? "أحداث جارية"
                      : "لا توجد أحداث نشطة"}
                  </p>
                </CardBody>
              </Card>

              {/* Completed Projects */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">المشاريع المكتملة</h2>
                  <CheckCircle />
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold">
                    {data.completedProjectsCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% من الشهر الماضي
                  </p>
                </CardBody>
              </Card>

              {/* Average Event Duration */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-sm font-medium">متوسط مدة الحدث</h2>
                  <Clock />
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold">
                    {data.avgEventDuration} ساعة
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollShadow>
  );
}

async function getData() {
  return {
    allUsersCount: 400,
    completedProjectsCount: 6000,
    avgEventDuration: 15.2,
    activeEventsCount: 40000,
  };
}
