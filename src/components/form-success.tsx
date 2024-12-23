import { Alert } from "@nextui-org/alert";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return <Alert color="success" title={message} />;
};
