const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 flex h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
