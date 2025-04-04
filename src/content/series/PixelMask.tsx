import Select from "node_modules/react-select/dist/declarations/src/Select";
import { Input, Label, SelectInput, Button } from "../../ui/";
import { Colors } from "../../utils";
import { Trash } from "../../icons";
import { useState } from "react";

type PixelMaskProps = {
    pixelMask: [dimension: string, { x: number, y: number, z: number }, { x: number, y: number, z: number }][];
    setPixelMask: React.Dispatch<React.SetStateAction<[dimension: string, { x: number, y: number, z: number }, { x: number, y: number, z: number }][]>>;
}

const PixelMask = ({ pixelMask, setPixelMask }: PixelMaskProps) => {
    const dimensions = [
        { value: "2D", label: "2D" },
        { value: "3D", label: "3D" },
    ]


    const addPixelMask = () => {
        if (!pixelMask)
            setPixelMask([[null, { x: null, y: null, z: null }, { x: null, y: null, z: null }]]);
        else
            setPixelMask((prevState) => [...prevState, [null, { x: null, y: null, z: null }, { x: null, y: null, z: null }]]);
    }

    const handleSelectDimension = (dimension: string, index: number) => {
        setPixelMask((prevState) => {
            const newState = [...prevState];
            newState[index][0] = dimension;
            return newState;
        });
    }

    const handleRemoveMask = (index: number) => {
        setPixelMask((prevState) => prevState.filter((_, i) => i !== index));
    }

    return (
        <div className="p-2 overflow-auto max-h-50 rounded-xl bg-light-gray">
            <div className="flex flex-col gap-5 justify-center items-center">
                {pixelMask && pixelMask.map((mask, index) => (
                    <div key={index} className="flex w-full gap-5 items-center">
                        <SelectInput
                            value={mask[0]}
                            onChange={(option) => {
                                handleSelectDimension(option ? option.value : null, index);
                            }}
                            placeholder="Select dimension"
                            options={dimensions}
                        />
                        <Input
                            placeholder="X"
                            disabled={!pixelMask[index][0] && true}
                        />
                        <Input
                            placeholder="Y"
                            disabled={!pixelMask[index][0] && true}
                        />
                        <Input
                            placeholder="Z"
                            disabled={!pixelMask[index][0] || pixelMask[index][0] !== "3D" && true}
                        />
                        <div className="w-20">
                            <Trash onClick={() => handleRemoveMask(index)} size={"1.3rem"} className="fill-danger cursor-pointer" />
                        </div>
                    </div>
                ))}
                <Button type="button" color={Colors.secondary} onClick={addPixelMask}>Add a Pixel Mask</Button>
            </div>
        </div>
    );
};

export default PixelMask;