import { CardWrapper } from "@/components/auth/card-wrapper";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Error"
      descriptionLabel="An error occurred. Please try again."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>!</AlertTitle>
      </Alert>
    </CardWrapper>
  );
};
