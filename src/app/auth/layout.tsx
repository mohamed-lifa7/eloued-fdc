const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container grid place-content-center my-16">{children}</div>
  );
};

export default AuthLayout;