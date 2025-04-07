import { Button } from "../../../ui";
import { Colors } from "../../../utils";
import { Check } from "../../../icons";
import { useState } from "react";
import PixelMaskEditForm from "./PixelMaskEditForm";
import ChevronDown from "../../../assets/chevron-right.svg?react";
import { PixelMaskType } from "./types";

type PixelMaskProps = {
    pixelMask: PixelMaskType[] | null;
    onChange: (pixelMask: PixelMaskType[] | null) => void;
}

const PixelMask = ({ pixelMask, onChange }: PixelMaskProps) => {
    const [editingPixelMask, setEditingPixelMask] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const handleChangeValueOfAnIteration = (PixelMask: PixelMaskType) => {
        const newPixelMask = [...pixelMask];
        newPixelMask[index] = PixelMask;
        onChange(newPixelMask);
    }

    const addPixelMask = () => {
        const newPixelMaskEntry: PixelMaskType = {
            dimension: null,
            maskType: null,
            maskTypeValue: null,
            start: { x: null, y: null, z: null },
            end: { x: null, y: null, z: null }
        };

        if (!pixelMask) {
            onChange([newPixelMaskEntry]);
            setIndex(0);
        } else {
            const newPixelMask = [...pixelMask, newPixelMaskEntry];
            onChange(newPixelMask);
            setIndex(pixelMask.length);
        }
        setEditingPixelMask(true);
    };

    const handleChevronClick = (index: number) => {
        setEditingPixelMask(true);
        setIndex(index);
    }

    const handleRemoveItteration = () => {
        const newPixelMask = [...pixelMask];
        newPixelMask.splice(index, 1);
        onChange(newPixelMask);
        setEditingPixelMask(false);
        setIndex(pixelMask.length);
    }

    return (
        <div className="p-2 overflow-auto max-h-80 rounded-xl bg-light-gray flex flex-col gap-3">
            {editingPixelMask ? (
                <>
                    <PixelMaskEditForm
                        pixelMask={pixelMask[index]}
                        onChange={handleChangeValueOfAnIteration}
                        onRemove={handleRemoveItteration}
                    />
                    <div className="flex justify-center">
                        <Button type="button" color={Colors.blueCustom} onClick={() => setEditingPixelMask(false)}>
                            <Check size="20px" />
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    {pixelMask?.map((mask, index) => (
                        <div key={index} className="flex justify-between items-center border border-gray-custom rounded-xl p-2 hover:bg-gray-300 cursor-pointer">
                            <div className="flex w-full gap-5 items-center">
                                <p className="text-sm text-dark"><span className="font-bold">Dimension :</span> {mask.dimension}</p>
                                <p className="text-sm text-dark"><span className="font-bold">Mask Type :</span> {mask.maskType}</p>
                                <p className="text-sm text-dark"><span className="font-bold">Mask Value :</span> {mask.maskTypeValue}</p>
                                <p className="text-sm text-dark"><span className="font-bold">Start coordinates :</span> {"x=" + mask.start.x},  {"y=" + mask.start.y} {mask.start.z ? ", z=" + mask.start.z : ""} </p>
                                <p className="text-sm text-dark"><span className="font-bold">End coordinates :</span> {"x=" + mask.end.x}, {"y=" + mask.end.y} {mask.end.z ? ", z=" + mask.end.z : ""} </p>
                            </div>
                            <div>
                                <ChevronDown className="fill-dark" onClick={() => handleChevronClick(index)} />
                            </div>
                        </div>
                    ))}
                </>
            )}
            {!editingPixelMask &&
                <div className="flex justify-center">
                    <Button type="button" color={Colors.blueCustom} onClick={() => addPixelMask()}>Add Pixel Mask</Button>
                </div>
            }
        </div>
    );
};

export default PixelMask;