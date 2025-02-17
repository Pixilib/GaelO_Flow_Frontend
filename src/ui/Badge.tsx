type Size = "sm" | "md" | "lg" | "xl";

type BadgeProps = {
  value?: number | string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: Size;
  borderColor?: string;
  variant?: "default" | "success" | "danger" | "warning";
  children?: React.ReactNode
  [key :string] : any
};

const Badge = ({
  value,
  className = "",
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) => {

  const sizeClasses = {
    sm: "text-xs p-1.5",
    md: "text-sm p-2 px-3",
    lg: "text-base p-3",
    xl: "text-lg p-4"
  };

  const variants = {
    default: {
      backgroundColor: "bg-indigo-100 dark:bg-neutral-700",
      textColor: "text-indigo-700 dark:text-indigo-300",
      borderColor: "ring-indigo-300 dark:ring-indigo-300",
    },
    success: {
      backgroundColor: "bg-green-100 dark:bg-neutral-700",
      textColor: "text-green-700 dark:text-emerald-400",
      borderColor: "ring-green-300 dark:ring-emerald-400",
    },
    danger: {
      backgroundColor: "bg-red-100",
      textColor: "text-red-700",
      borderColor: "ring-red-300",
    },
    warning: {
      backgroundColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      borderColor: "ring-yellow-300",
    },
  };

  const badgeClasses = `
    rounded-xl
    ${variants[variant].backgroundColor} 
    ${variants[variant].textColor}
    ${sizeClasses[size]} 
    ${variants[variant].borderColor}
    font-medium
    ring-1 ring-inset
    ${className}
  `;

  return <span className={badgeClasses} {...props}>{value ?? children ?? null}</span>;
};

export { Badge };
