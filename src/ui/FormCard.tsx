import { FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";
import { useState, ReactNode, FormEvent } from 'react';
import { Card, CardBody, CardHeader, CloseButton } from '../ui';
import { Colors } from '../utils';

type FormCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
};

const FormCard = ({ title, onSubmit, children, className, collapsible = false, onClose }: FormCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card className={`my-5 h-full ${className}`}>
      <CardHeader title={title} color={Colors.success}>
        <div className="flex items-center">
          {collapsible && (
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="me-4">
              {isCollapsed ? <FaWindowMaximize /> : <FaWindowMinimize />}
            </button>
          )}
          {onClose && <CloseButton onClose={onClose} />}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardBody color={Colors.lightGray}>
          {onSubmit ? (
            <form onSubmit={onSubmit} className="grid gap-y-2 lg:gap-y-4">
              {children}
            </form>
          ) : (
            <div className="grid gap-y-2 lg:gap-y-4">{children}</div>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default FormCard;
