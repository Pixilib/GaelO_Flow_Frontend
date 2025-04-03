import { Trash } from "../../icons";
import { Colors } from "../../utils/";
import Button from "../Button";
import Input from "../Input";
import { ChangeEvent } from "react";

type KeyValueTableProps = {
    keyVal: { id: string; [key: string]: string | number }[];
    setKeyVal: React.Dispatch<React.SetStateAction<{ id: string; key: string; val: string | number }[]>>;
    buttonText: string
    keyPlaceHolder: string
    valuePlaceHolder: string
};

const KeyValueTable = ({keyVal, setKeyVal, buttonText, keyPlaceHolder, valuePlaceHolder} : KeyValueTableProps) => {
    const addKeyValue = () => {
        setKeyVal(prevState => [...prevState, { id: crypto.randomUUID(), key:"", val:"" }]);
    };

    const handleKeyChange = (id: string, key: string) => {
        setKeyVal(prevState => 
            prevState.map(kv => kv.id === id ? { ...kv, key } : kv)
        );
    };

    const handleValueChange = (id: string, value: string | number) => {
        setKeyVal(prevState => 
            prevState.map(kv => kv.id === id ? { ...kv, val: value } : kv)
        );
    };

    const handleRemoveKeyVal = (id: string) => {
        setKeyVal(prevState => prevState.filter(kv => kv.id !== id));

    };

    return (
        <div className="p-2 overflow-auto max-h-40 rounded-xl bg-light-gray">
            <div className="flex flex-col gap-5 justify-center items-center overflow-auto">
                {keyVal.map((kv)=> (
                    <div key={kv.id} className="flex w-full gap-10 items-center"> 
                        <Input
                            fieldName="key"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleKeyChange(kv.id, e.target.value)}
                            placeholder={keyPlaceHolder}
                        />
                        <p> = </p>
                        <Input
                            fieldName="value"
                            placeholder={valuePlaceHolder}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleValueChange(kv.id, e.target.value)}
                        />
                        <Trash onClick={() => handleRemoveKeyVal(kv.id)} size={"3rem"} className="fill-danger" />
                    </div>
                ))}
                <Button type="button" color={Colors.secondary} onClick={addKeyValue}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default KeyValueTable;
