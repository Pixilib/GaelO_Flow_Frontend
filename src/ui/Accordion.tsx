import React from 'react';

type AccordionProps = {
    summary: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'primary' | 'secondary';
};

const Accordion: React.FC<AccordionProps> = ({ summary, children, variant = 'default', className="" }) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'secondary':
                return {
                    container: 'border border-blue-300 rounded-lg my-2',
                    summary: 'cursor-pointer flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200',
                    content: 'p-4 bg-blue-50',
                };
            case 'primary':
                return {
                    container: 'border border-almond rounded-lg my-2 shadow-md',
                    summary: 'cursor-pointer flex justify-between items-center p-4 bg-almond hover:bg-almond-hover',
                    content: 'p-4 bg-light',
                };
            case 'default':
            default:
                return {
                    container: 'border border-gray-300 rounded-lg my-2 shadow-md',
                    summary: 'cursor-pointer flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200',
                    content: 'p-4 bg-white',
                };
        }
    };

    const classes = getVariantClasses();

    return (
        <details className={`transition-all duration-300 ease-in-out ${classes.container} ${className}`}>
            <summary className={`${classes.summary}`}>
                {summary}
            </summary>
            <div className={`${classes.content}`}>
                {children}
            </div>
        </details>
    );
};

export default Accordion;
