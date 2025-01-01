import { currentUser } from "@/server/auth";
import SettingsForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <CardContent>
          <SettingsForm user={user!} />
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfilePage;
