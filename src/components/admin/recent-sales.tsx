import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { User } from "@prisma/client";

export function RecentSales({
  users,
  totalUsers,
}: {
  users: User[];
  totalUsers: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent users registration</CardTitle>
        <CardDescription>Thera are total {totalUsers}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {users.map((user) => (
            <div className="flex items-center" key={user.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image!} alt="Avatar" />
                <AvatarFallback>
                  {user.name?.slice(0, 3).toLowerCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-medium">{user.reputation} pts</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
