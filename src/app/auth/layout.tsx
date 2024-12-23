const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid place-content-center">{children}</div>
  );
};

export default AuthLayout;