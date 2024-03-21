import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
}

export default function FormButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {children}
    </Button>
  );
}
