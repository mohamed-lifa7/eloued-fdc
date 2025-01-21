import { links } from "@/config/site-config";
import { Icons } from "../icons";
import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer className="border-foreground-50 container border-t py-10 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center space-x-4">
          <Icons.logo className="h-12 w-12" />
          <p className="text-lg font-bold">Future Developers Club</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            <Icons.linkedin className="h-6 w-6" />
          </Link>
          <Link
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            <Icons.github className="h-6 w-6" />
          </Link>
          <Link
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            <Icons.instagram className="h-6 w-6" />
          </Link>
          <Link
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            <Icons.telegram className="h-6 w-6" />
          </Link>
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
