import React, { useEffect, useState } from 'react';

type AccordionProps = {
    summary: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'primary' | 'secondary';
    onOpenChange? : (open : boolean)=> void
};

const Accordion: React.FC<AccordionProps> = ({ summary, children, variant = 'default', className="" }) => {
    const [isOpen, setIsOpen] = useState(false);

    // , onOpenChange = () => void

    // useEffect(()=>{
    //     onOpenChange(isOpen)
    // }, [isOpen])

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const rounded = `{ ${isOpen ?'rounded-t-2xl':'rounded-2xl'} }`

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
                    container: `border border-light-gray ${rounded} my-2 shadow-md`,
                    summary: `cursor-pointer flex justify-between items-center p-4 bg-light-gray hover:bg-grayCustom ${rounded}`,
                    content: `p-4 bg-light-gray ${isOpen ? 'rounded-b-2xl' : ''}`,
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
        <div className={`transition-all duration-300 ease-in-out ${classes.container} ${className}`}>
            <div className={`${classes.summary}`} onClick={handleToggle}>
                {summary}
            </div>
            {isOpen && (
                <div className={`${classes.content}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
