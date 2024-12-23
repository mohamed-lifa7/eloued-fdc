import { Icons } from "../icons";

const SiteFooter = () => {
  return (
    <footer className="container py-10 text-center border-t border-foreground-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center space-x-4">
          <Icons.logo className="h-12 w-12" />
          <p className="text-lg font-bold">Future Developers Club</p>
        </div>
        <p className="text-muted-foreground text-sm">
          المكان المثالي لمشاركة الأفكار والإلهام، لأن مستقبل التكنولوجيا يبدأ
          من هنا!
        </p>
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Future Developers Club. جميع الحقوق
          محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
