import React, { ChangeEvent } from "react";
import { Input, SelectInput } from "../../../ui";
import { Trash } from "../../../icons";

type PixelMask = [
    dimension: string | null,
    maskType: string | null,
    maskTypeValue: number | null,
    { x: number | null; y: number | null; z: number | null },
    { x: number | null; y: number | null; z: number | null }
];

type PixelMaskEditProps = {
    index: number;
    pixelMask: PixelMask[] | null;
    setPixelMask: React.Dispatch<React.SetStateAction<[
        dimension: string | null,
        maskType: string | null,
        maskTypeValue: number | null,
        { x: number | null; y: number | null; z: number | null },
        { x: number | null; y: number | null; z: number | null }
    ][] | null>>;
}

const dimensions = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
]

const maskTypes = [
    { value: "MeanFilter", label: "MeanFilter" },
    { value: "Fill", label: "Fill" },
]

const enum StartOrEnd {
    start = 3, // start coordinates at index 3 of the pixelMask array
    end = 4, // end coordinates at index 4 of the pixelMask array
}

const PixelMaskEditForm = ({index, pixelMask, setPixelMask}: PixelMaskEditProps) => {

    const handleSelectDimension = (dimension: string, index: number) => {
        setPixelMask((prevState) => {
            const newState = [...prevState];
            newState[index][0] = dimension;
            return newState;
        });
    }

    const handleSelectMaskType = (maskType: string, index: number) => {
        setPixelMask((prevState) => {
            const newState = [...prevState];
            newState[index][1] = maskType;
            return newState;
        });
    }

    const handleMaskTypeValue = (maskTypeValue: number, index: number) => {
        setPixelMask((prevState) => {
            const newState = [...prevState];
            newState[index][2] = maskTypeValue;
            return newState;
        });
    }

    const handleRemoveMask = (index: number) => {
        setPixelMask((prevState) => prevState.filter((_, i) => i !== index));
    }

    const handleChange = (value: number, index: number, startEnd: StartOrEnd, cooLetter: string) => {
        setPixelMask((prevState) => {
            const newState = [...prevState];
            if (cooLetter === "x")
                newState[index][startEnd][cooLetter] = value;
            if (cooLetter === "y")
                newState[index][startEnd][cooLetter] = value;
            if (cooLetter === "z")
                newState[index][startEnd][cooLetter] = value;
            return newState;
        });
    }

    return (
        <div key={index} className="flex flex-col border border-gray-custom rounded-xl pl-2 pr-2 pb-4">
            <div className="flex w-full gap-5 items-center">
                <SelectInput
                    value={pixelMask[index][0]}
                    onChange={(option) => {
                        handleSelectDimension(option ? option.value : null, index);
                    }}
                    placeholder="Select dimension"
                    options={dimensions}
                />
                <div className="flex flex-col gap-5 w-1000 rounded-xl p-5">
                    <div className="flex gap-5">
                        <Input
                            placeholder="Origin X"
                            type="number"
                            disabled={!pixelMask[index][0] && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.start, "x")}
                        />
                        <Input
                            placeholder="Origin Y"
                            type="number"
                            disabled={!pixelMask[index][0] && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.start, "y")}
                        />
                        <Input
                            placeholder="Origin Z"
                            type="number"
                            disabled={!pixelMask[index][0] || pixelMask[index][0] !== "3D" && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.start, "z")}
                        />
                    </div>
                    <div className="flex gap-5">
                        <Input
                            placeholder="End X"
                            type="number"
                            disabled={!pixelMask[index][0] && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.end, "x")}
                        />
                        <Input
                            placeholder="End Y"
                            type="number"
                            disabled={!pixelMask[index][0] && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.end, "y")}
                        />
                        <Input
                            placeholder="End Z"
                            type="number"
                            disabled={!pixelMask[index][0] || pixelMask[index][0] !== "3D" && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), index, StartOrEnd.end, "z")}
                        />
                    </div>
                </div>
                <div className="w-20">
                    <Trash onClick={() => handleRemoveMask(index)} size={"1.3rem"} className="fill-danger cursor-pointer" />
                </div>
            </div>
            <div className="flex gap-5 items-center">
                <SelectInput
                    value={pixelMask[index][1]}
                    onChange={(option) => {
                        handleSelectMaskType(option ? option.value : null, index);
                    }}
                    placeholder={"Select Mask Type"}
                    options={maskTypes}
                />
                <Input
                    placeholder={pixelMask[index][1] === "MeanFilter" ? "Filter Width" : "Fill Value"}
                    type="number"
                    disabled={!pixelMask[index][1] && true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleMaskTypeValue(parseInt(e.target.value), index)}
                />
            </div>
        </div>
    );
}

export default PixelMaskEditForm;