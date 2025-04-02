import { Trash } from "../../icons";
import { Colors } from "../../utils/";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";


const KeyValueTable = () => {
    const [fields, setFields] = useState([]);

    const handleButtonClick = () => {
        setFields(prevFields => [...prevFields, { id: crypto.randomUUID(), key: "", value: "" }]);
    };

    const handleDeleteField = (id: number) => {
        setFields(prevFields => prevFields.filter(field => field.id !== id));
    }

    return (
        <div className="p-2 overflow-auto max-h-40 max-h-40 rounded-xl bg-light-gray">
            <div className="flex flex-col gap-5 justify-center items-center overflow-auto">
                {fields.map((field)=> (
                    <div key={field.id} className="flex w-full gap-10 items-center"> 
                        <Input
                            placeholder="key"
                        />
                        <p> = </p>
                        <Input
                            placeholder="value"
                        />
                        <Trash onClick={() => handleDeleteField(field.id)} size={"3rem"} className="fill-danger" />
                    </div>
                ))}
                <Button type="button" color={Colors.secondary} onClick={handleButtonClick}> Add a field </Button>
            </div>
        </div>
    );
};

export default KeyValueTable;
