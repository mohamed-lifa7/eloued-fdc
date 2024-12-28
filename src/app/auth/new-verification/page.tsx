import { NewVerificationForm } from "@/components/auth/new-verification-form";

export const metadata = {
  title: "Email Verification",
  description: "Verify your email to complete the registration.",
};

const NewVerificationPage = () => {
  return <NewVerificationForm />;
};

export default NewVerificationPage;
