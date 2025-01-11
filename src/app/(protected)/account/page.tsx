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
import CopyIdComponent from "@/components/ui/copy-id";

const ProfilePage = async () => {
  const user = await currentUser();

  return (
    <main className="grid w-full place-content-center lg:min-h-screen">
      <Card className="my-16 lg:w-[600px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Here you can view and manage your profile
          </CardDescription>
        </CardHeader>
        <Separator className="my-6" />

        <CardContent>
          <CardTitle>Share your profile</CardTitle>
          <div className="my-4 flex items-center space-x-6">
            <p className="">Click here to copy your profile link:</p>
            <CopyIdComponent
              id={`https://futuredev.club/profile/${user?.id}`}
            />
          </div>
          <Separator className="my-6" />
          <SettingsForm user={user!} />
        </CardContent>
        <Separator className="my-6" />
        <CardFooter>
          <UpdateImage />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfilePage;
