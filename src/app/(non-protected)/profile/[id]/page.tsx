import * as React from "react";
import { TelegramHeader } from "@/components/ui/telegram-profile-header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/data/user";
import { notFound } from "next/navigation";
import { faculties } from "@/config/univ-config";
import { getRank } from "@/lib/utils";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUserById((await params).id);
  if (!user) return notFound();
  return (
    <div className="mx-auto my-20 h-[600px] w-full max-w-md">
      <Card className="overflow-hidden">
        <TelegramHeader
          avatar={user.image!}
          name={user.name!}
          rank={getRank(user.reputation)}
          exp={user.reputation}
        />
        <Separator />
        <CardContent className="mt-6 space-y-2">
          <p className="text-center">{user.bio}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Faculty</p>
            <p className="text-muted-foreground">
              {faculties[user.faculty as keyof typeof faculties] ||
                "Unknown Faculty"}
            </p>
          </div>
          {user.birthday && (
            <div className="flex items-center justify-between">
              <p className="font-semibold">Birthday</p>
              <p className="text-muted-foreground">
                {user.birthday?.toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="font-semibold">Joined at</p>
            <p className="text-muted-foreground">
              {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
