const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container my-16 grid place-content-center">{children}</div>
  );
};

export default AuthLayout;
