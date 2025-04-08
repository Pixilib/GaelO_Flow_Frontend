/**
 * @Component Label
 * This component is useful for input component to have more control
 * over the label style
 */
type LabelProps = {
    value:string;
    align?:"left"| "right" | "center";
    classParent?: string;
    className?: string;
    [key: string]: any;
};

const Label = ({value, align="left", classParent, className, ...props }:LabelProps) => {
    return (
        <div className={`mb-2 text-sm font-medium text-dark dark:text-white text-${align} ${classParent}`} >
            <label className={className} {...props}> { value }</label>
        </div>
    );
}
export default Label;