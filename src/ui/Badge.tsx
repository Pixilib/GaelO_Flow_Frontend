
type BadgeProps = {
    value: number;
    className?: string;
};


const Badge = ({ value, className }:BadgeProps) => {
    const badgeClasses = `rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ${className}`;
    return <span className={badgeClasses}>{value}</span>;
};

export default Badge;