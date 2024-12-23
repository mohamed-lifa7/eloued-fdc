import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "تسجيل الدخول",
  description: "قم بتسجيل الدخول إلى حسابك الآن.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;