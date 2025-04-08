import React, { ChangeEvent } from "react";
import { Input, SelectInput } from "../../../ui";
import { Trash } from "../../../icons";
import { PixelMaskType } from "./types";

type PixelMaskEditProps = {
    pixelMask: PixelMaskType | null;
    onChange: (pixelMask: PixelMaskType | null) => void;
    onRemove: () => void;
}

const dimensionsOptions = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
]

const maskTypesOptions = [
    { value: "MeanFilter", label: "MeanFilter" },
    { value: "Fill", label: "Fill" },
]

const enum StartOrEnd {
    start = "start",
    end = "end"
}

type Axis = 'x' | 'y' | 'z';

const PixelMaskEditForm = ({pixelMask, onChange, onRemove}: PixelMaskEditProps) => {

    const handleSelectDimension = (dimension: string) => {
        const newPixelMask = pixelMask;
        newPixelMask.dimension = dimension;
        onChange(newPixelMask);
    }

    const handleSelectMaskType = (maskType: string) => {
        const newPixelMask = pixelMask;
        newPixelMask.maskType = maskType;
        onChange(newPixelMask);
    }

    const handleMaskTypeValue = (maskTypeValue: number) => {
        const newPixelMask = pixelMask;
        newPixelMask.maskTypeValue = maskTypeValue;
        onChange(newPixelMask);
    }

    const handleChange = (value: number, startEnd: StartOrEnd, axis :Axis ) => {
        const newPixelMask = pixelMask;
        newPixelMask[startEnd][axis] = value;
        onChange(newPixelMask);
    }

    return (
        <div className="flex flex-col border border-gray-custom rounded-xl pl-2 pr-2 pb-4">
            <div className="flex w-full gap-5 items-center">
                <SelectInput
                    value={pixelMask?.dimension || null}
                    onChange={(option) => {
                        handleSelectDimension(option ? option.value : null);
                    }}
                    placeholder="Select dimension"
                    options={dimensionsOptions}
                />
                <div className="flex flex-col gap-5 w-1000 rounded-xl p-5">
                    <div className="flex gap-5">
                        <Input
                            placeholder="Origin X"
                            type="number"
                            value={pixelMask?.start?.x || ""}
                            disabled={!pixelMask.dimension && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.start, "x")}
                        />
                        <Input
                            placeholder="Origin Y"
                            type="number"
                            value={pixelMask?.start?.y || ""}
                            disabled={!pixelMask.dimension && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.start, "y")}
                        />
                        <Input
                            placeholder="Origin Z"
                            type="number"
                            value={pixelMask?.start?.z || ""}
                            disabled={!pixelMask.dimension || pixelMask.dimension !== "3D" && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.start, "z")}
                        />
                    </div>
                    <div className="flex gap-5">
                        <Input
                            placeholder="End X"
                            type="number"
                            value={pixelMask?.end?.x || ""}
                            disabled={!pixelMask.dimension && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.end, "x")}
                        />
                        <Input
                            placeholder="End Y"
                            type="number"
                            value={pixelMask?.end?.y || ""}
                            disabled={!pixelMask.dimension && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.end, "y")}
                        />
                        <Input
                            placeholder="End Z"
                            type="number"
                            value={pixelMask?.end?.z || ""}
                            disabled={!pixelMask.dimension || pixelMask.dimension !== "3D" && true}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(parseInt(e.target.value), StartOrEnd.end, "z")}
                        />
                    </div>
                </div>
                <div className="w-20">
                    <Trash onClick={() => onRemove} size={"1.3rem"} className="fill-danger cursor-pointer" />
                </div>
            </div>
            <div className="flex gap-5 items-center">
                <SelectInput
                    value={pixelMask?.maskType || null}
                    onChange={(option) => {
                        handleSelectMaskType(option?.value ?? null);
                    }}
                    placeholder={"Select Mask Type"}
                    options={maskTypesOptions}
                />
                <Input
                    placeholder={pixelMask.maskType === "MeanFilter" ? "Filter Width" : "Fill Value"}
                    type="number"
                    value={pixelMask?.maskTypeValue ?? ""}
                    disabled={!pixelMask.maskType && true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleMaskTypeValue(parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}

export default PixelMaskEditForm;