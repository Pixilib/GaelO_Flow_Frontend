import React, { useState } from "react";

export type DropdownProps = {
    popover: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    withOnClick?: boolean;
    direction?: "up" | "down";
    [key: string]: any;
};
const Dropdown = ({
    className = "",
    children,
    withOnClick = false,
    popover,
    ...props
}: DropdownProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEvent = withOnClick
        ? { onClick: () => setIsExpanded(!isExpanded) }
        : {
            onMouseEnter: () => setIsExpanded(true),
            onMouseLeave: () => setIsExpanded(false),
        };

    return (
        <div
            className="hs-dropdown [--scope:window] relative inline-flex "
            {...handleEvent}
            {...props}
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {children}
            </div>
            {isExpanded && (
                <div
                    className={`hs-dropdown-menu transition-[opacity,margin] 
                    absolute
                    top-12 right-0 
                    !z-[999]
                    bg-white shadow-xl dark:bg-neutral-800 rounded-xl`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-default"
                >
                    <div className="text-sm text-gray-700 dark:text-gray-200 rounded-xl border">
                        {popover}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
