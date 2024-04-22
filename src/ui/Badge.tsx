
type BadgeProps = {
    value: number|string;
    className?: string;
    [key: string]: any;
};
const Badge = ({ value, className = "" }:BadgeProps) => {
    const badgeClasses = `rounded-xl bg-indigo-100 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-green-600/20 ${className}`;
    return <span className={badgeClasses}>{value}</span>;
};

export default Badge;