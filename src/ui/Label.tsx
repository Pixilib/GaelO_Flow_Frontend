/**
 * @Component Label
 * This component is useful for input component to have more control
 * over the label style
 */

type LabelProps = {
    value:string
    align?:"left"| "right" | "center";
    className?: string;
    [key: string]: any;
};


const Label = ({value, align="left", className, ...props }:LabelProps) => {
    return (
        <div className={`text-${align}`} >
            <label className={className} {...props}> { value }</label>
        </div>
    );
}
export default Label;