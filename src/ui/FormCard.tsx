import  { ReactNode, FormEvent } from 'react';
import { Card, CardBody, CardHeader, CloseButton } from '../ui';
import { Colors } from '../utils';

type FormCardProps = {
  header: {
    title: string;
    onClose: () => void;
  };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
};

const FormCard = ({ header, onSubmit, children, className }: FormCardProps) => {
  return (
    <Card className={`my-10 h-full ${className}`}>
      <CardHeader title={header.title} color={Colors.success}>
        <CloseButton onClose={header.onClose} />
      </CardHeader>
      <CardBody color={Colors.lightGray}>
        <form onSubmit={onSubmit} className="grid gap-y-2 lg:gap-y-4">
          {children}
        </form>
      </CardBody>
    </Card>
  );
};

export default FormCard;
