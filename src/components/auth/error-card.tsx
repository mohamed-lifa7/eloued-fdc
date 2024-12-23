import { CardWrapper } from "@/components/auth/card-wrapper";
import { Alert } from "@nextui-org/alert";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="خطأ"
      descriptionLabel="حدث خطأ. يرجى المحاولة مرة أخرى."
      backButtonHref="/auth/login"
      backButtonLabel="الرجوع إلى تسجيل الدخول"
    >
      <div className="flex w-full items-center justify-center">
        <Alert color="danger" title="!" />
      </div>
    </CardWrapper>
  );
};
