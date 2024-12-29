import { Icons } from "@/components/icons";
const loading = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Icons.loader />
      <p className="text-primary-grey-300 text-sm font-bold">Loading...</p>
    </div>
  );
};

export default loading;
