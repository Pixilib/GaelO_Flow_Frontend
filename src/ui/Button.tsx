import { Colors } from "../utils/enums";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Colors;
  className?: string;
  bordered?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color,
  bordered,
  className = '',
  children,
  ...props
}) => {
  const colorClasses: Record<keyof typeof Colors, string> = {
    almond: "bg-almond",
    primary: "bg-primary",
    primaryHover: "hover:bg-primary-hover",
    secondary: "bg-secondary",
    secondaryHover: "hover:bg-secondary-hover",
    danger: "bg-danger",
    dangerHover: "hover:bg-danger-hover",
    success: "bg-success",
    successHover: "hover:bg-success-hover",
    disabled: "bg-disabled",
    orange: "bg-orange",
    orangeHover: "hover:bg-orange-hover",
    dark: "bg-dark",
    red: "bg-red",
    gray: "bg-gray",
    light: "bg-light",
    grayCustom: ""
  };


  const borderClasses = bordered ? "border border-white" : "";

  return (
    <button
      {...props} 
      className={`flex items-center justify-center ${colorClasses[color]} ${borderClasses} focus:shadow-outline rounded-full p-3 font-semibold text-white shadow-lg focus:outline-none disabled:bg-opacity-70 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
