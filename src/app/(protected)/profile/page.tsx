import { currentUser } from "@/server/auth";
import SettingsForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateImage } from "./update-image";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  return (
    <main className="grid w-full place-content-center lg:min-h-screen">
      <Card className="my-16 lg:w-[600px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Here you can view and manage your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} />
        </CardContent>
        <Separator className="my-6" />
        <CardFooter>
          <UpdateImage currentImageUrl={user.image!} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfilePage;
