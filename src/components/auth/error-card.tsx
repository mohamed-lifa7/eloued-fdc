import { CardWrapper } from "@/components/auth/card-wrapper";
import { Alert } from "@nextui-org/alert";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Error"
      descriptionLabel="An error occurred. Please try again."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <Alert color="danger" title="!" />
      </div>
    </CardWrapper>
  );
};
