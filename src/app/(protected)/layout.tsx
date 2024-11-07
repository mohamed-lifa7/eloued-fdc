import { SiteHeader } from "@/components/layout/site-header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="my-4 flex justify-center py-4">
      <SiteHeader/>
      {children}
    </div>
  )
  
};

export default ProtectedLayout;
