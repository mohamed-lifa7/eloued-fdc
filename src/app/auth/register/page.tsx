import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
    title: "إنشاء حساب",
    description: "قم بإنشاء حساب جديد للانضمام إلينا الآن.",
  };
  

const RegisterPage = () => {
  return ( 
    <RegisterForm />
  );
}
 
export default RegisterPage;