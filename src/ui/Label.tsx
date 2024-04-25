/**
 * @Component Label
 * This component is useful for input component to have more control
 * over the label style
 */
type spaceYtype = 1 | 2 | 3 | 4 | 5 | 6;
type LabelProps = {
    value:string;
    spaceY?: spaceYtype;
    align?:"left"| "right" | "center";
    className?: string;
    [key: string]: any;
};


const Label = ({value, align="left", spaceY, className, ...props }:LabelProps) => {
    return (
        <div className={`text-${align} mb-${spaceY}`} >
            <label className={className} {...props}> { value }</label>
        </div>
    );
}
export default Label;