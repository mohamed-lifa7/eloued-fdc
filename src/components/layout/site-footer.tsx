import { Icons } from "../icons";

const SiteFooter = () => {
  return (
    <footer className="container border-t border-foreground-50 py-10 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center space-x-4">
          <Icons.logo className="h-12 w-12" />
          <p className="text-lg font-bold">Future Developers Club</p>
        </div>
        <p className="text-sm text-muted-foreground">
          The perfect place to share ideas and inspiration, because the future
          of technology starts here!
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Future Developers Club. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
