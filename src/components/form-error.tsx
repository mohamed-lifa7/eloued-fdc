import { Alert } from "@nextui-org/alert";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <Alert color="danger" title={message} />;
};
