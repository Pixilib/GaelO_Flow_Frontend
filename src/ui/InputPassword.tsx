import React, { useState, ChangeEvent } from 'react';
import { ToggleEye } from '../ui';
import Input from './Input';
import Label from './Label';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_.+])[A-Za-z\d!@#$%^&*()\-_.+]{12,}$/;

type InputPasswordProps = {
  className?: string;
  placeholder?: string;
  label?: string | React.ReactElement<typeof Label>;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  [key: string]: any;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  className,
  placeholder = 'Enter your password',
  label,
  value,
  onChange,
  autoComplete = 'off',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className="w-full">
      {label &&
        typeof label === "string" ? (
        <label className="mb-2 text-sm font-medium text-dark">{label}</label>
      ) : label}

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={handlePasswordChange}
          autoComplete={autoComplete}
          svgRight={<ToggleEye onToggle={(visible) => setShowPassword(visible)} />}
          className={`
            ${className}
            peer
            border-2
            focus:outline-hidden
            focus:ring-2
            focus:ring-offset-2
            invalid:border-red-500
            valid:border-green-500
            focus:invalid:ring-red-500
            focus:valid:ring-green-500
          `}
          pattern={PASSWORD_REGEX.source}
          required
          {...props}
        />
        <p className="mt-2 invisible text-xs text-red-500 peer-[&:not(:placeholder-shown):invalid]:visible">
          At least 12 characters, with uppercase, lowercase, number, and special character.
        </p>
      </div>
    </div>
  );
};

export default InputPassword;
