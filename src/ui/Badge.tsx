type BadgeProps = {
  value: number | string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

const Badge = ({
  value,
  className = "",
  backgroundColor = "bg-indigo-100",
  textColor = "text-indigo-700",
  borderColor = "ring-indigo-300"
}: BadgeProps) => {
  const badgeClasses = `rounded-xl ${backgroundColor} px-2 py-1 text-xs font-medium ${textColor} ring-1 ring-inset ${borderColor} ${className}`;
  return <span className={badgeClasses}>{value}</span>;
};

const BadgeSuccess = ({
  value,
  className = "",
  backgroundColor = "bg-green-100",
  textColor = "text-green-700",
  borderColor = "ring-green-300"
}: BadgeProps) => {
  const badgeClasses = `rounded-xl ${backgroundColor} px-2 py-1 text-xs font-medium ${textColor} ring-1 ring-inset ${borderColor} ${className}`;
  return <span className={badgeClasses}>{value}</span>;
};

const BadgeDanger = ({
  value,
  className = "",
  backgroundColor = "bg-red-100",
  textColor = "text-red-700",
  borderColor = "ring-red-300"
}: BadgeProps) => {
  const badgeClasses = `rounded-xl ${backgroundColor} px-2 py-1 text-xs font-medium ${textColor} ring-1 ring-inset ${borderColor} ${className}`;
  return <span className={badgeClasses}>{value}</span>;
};

export { Badge, BadgeSuccess, BadgeDanger };
