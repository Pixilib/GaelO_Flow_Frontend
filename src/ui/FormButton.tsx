import React, { ReactNode } from 'react';
import { Button } from '../ui';
import { Colors } from '../utils';

type FormButtonProps = {
  text: string;
  icon?: ReactNode;
  className?: string;
  [key: string] : any
}&React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormButton = ({ text, icon, className, ...props }: FormButtonProps) => {
  return (
    <Button
      color={Colors.success}
      className={`h-12 gap-3 justify-self-center w-36 md:justify-center ${className}`}
      type="submit"
      {...props}
    >
      {icon}
      <div>{text}</div>
    </Button>
  );
};

export default FormButton;
