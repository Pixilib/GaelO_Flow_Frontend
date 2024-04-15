
type BadgeProps = {
    value: number|string;
    className?: string;
    [key: string]: any;
};
const Badge = ({ value, className }:BadgeProps) => {
    const badgeClasses = `flex place-content-center px-6 py-1 text-m font-medium text-center ring-0 ring-inset outline-0 min-w-4 ${className}`;
    return <span className={badgeClasses}>{value}</span>;
};

export default Badge;