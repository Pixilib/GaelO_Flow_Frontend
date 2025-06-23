import { Button } from "../../../ui";
import { Colors } from "../../../utils";

type DicomComparaisonLinesProps = {
    name: string;
    itemCheck: any;
    itemForce: boolean;
    onItemForceChange: (value: boolean) => void;
    className?: string;
}

const styleValidate = 'bg-green-100 border-green-300 dark:bg-green-200/30 dark:border-green-300/30';
const styleUnValidated = 'bg-red-100 border-red-300 dark:bg-red-200/30 dark:border-red-300/30';

const DicomComparaisonLines = ({
    name,
    itemCheck,
    itemForce,
    onItemForceChange,
    className = ""
}: DicomComparaisonLinesProps
) => {
    return (
        <div className={`${className} flex flex-row items-center p-1 pl-3 pr-3 border-b border-t ${(itemCheck.pass || itemForce) ? styleValidate : styleUnValidated}`}>
            <p className="w-full font-semibold">{name}</p>
            <p className="w-full">{itemCheck.dicom}</p>
            <p className="w-full">{itemCheck.gaelo}</p>
            <div className="w-full">
                {!itemCheck.pass &&
                    <Button
                        className="h-7"
                        color={itemForce ? Colors.danger : Colors.success}
                        onClick={() => onItemForceChange(!itemForce)}
                        children={
                            <p className="text-sm">{itemForce ? "Consider" : "Ignore"}</p>
                        }
                    />
                }
            </div>
        </div>
    )
}

export default DicomComparaisonLines;