import { Button } from "../../../ui";
import { Colors } from "../../../utils";
import { Check } from "../../../icons";
import { useState } from "react";
import PixelMaskEditForm from "./PixelMaskEditForm";

type PixelMaskProps = {
    pixelMask: [
        dimension: string, // "2D" or "3D"
        maskType: string, // "MeanFilter" or "Fill"
        maskTypeValue: number, // value for the mask
        { x: number, y: number, z: number }, // start coordinates
        { x: number, y: number, z: number }
    ][] | null; // end coordinates

    setPixelMask: React.Dispatch<React.SetStateAction<[
        dimension: string,
        maskType: string,
        maskTypeValue: number,
        { x: number, y: number, z: number },
        { x: number, y: number, z: number }
    ][] | null>>;
}

const PixelMask = ({ pixelMask, setPixelMask }: PixelMaskProps) => {
    const [editingPixelMask, setEditingPixelMask] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const handleSavePixelMask = () => {
        setEditingPixelMask(false);
    }

    const addPixelMask = () => {
        if (!pixelMask) {
            setPixelMask([[null, null, null, { x: null, y: null, z: null }, { x: null, y: null, z: null }]]);
            setIndex(0);
        } else {
            setPixelMask((prevState) => [...prevState, [null, null, null, { x: null, y: null, z: null }, { x: null, y: null, z: null }]]);
            setIndex(pixelMask.length);
        }
        setEditingPixelMask(true);
    }

    return (
        <div className="p-2 overflow-auto max-h-80 rounded-xl bg-light-gray flex flex-col gap-3">
            {editingPixelMask ? (
                <>
                    <PixelMaskEditForm
                        index={index}
                        pixelMask={pixelMask}
                        setPixelMask={setPixelMask}
                        key={index}
                    />
                    {editingPixelMask && (
                        <div className="flex justify-center">
                            <Button type="button" color={Colors.blueCustom} onClick={() => handleSavePixelMask()}>
                                <Check size="20px" />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {pixelMask && pixelMask.map((mask, index) => (
                        <div key={index} className="flex w-full gap-5 items-center border border-gray-custom rounded-xl p-2 hover:bg-gray-300 cursor-pointer">
                            <p className="text-sm text-dark"><span className="font-bold">Dimension :</span> {pixelMask && pixelMask[index][0]}</p>
                            <p className="text-sm text-dark"><span className="font-bold">Mask Type :</span> {pixelMask && pixelMask[index][1]}</p>
                            <p className="text-sm text-dark"><span className="font-bold">Mask Value :</span> {pixelMask && pixelMask[index][2]}</p>
                            <p className="text-sm text-dark"><span className="font-bold">Start coordinates :</span> {"x=" + pixelMask[index][3].x},  {"y=" + pixelMask[index][3].y} {pixelMask[index][3].z ? ", z=" + pixelMask[index][3].z : ""} </p>
                            <p className="text-sm text-dark"><span className="font-bold">End coordinates :</span> {"x=" + pixelMask[index][4].x}, {"y=" + pixelMask[index][4].y} {pixelMask[index][4].z ? ", z=" + pixelMask[index][4].z : ""} </p>
                        </div>
                    ))}
                </>
            )}
            <div className="flex justify-center">
                {!editingPixelMask &&
                    <Button type="button" color={Colors.blueCustom} onClick={() => addPixelMask()}>Add Pixel Mask</Button>
                }
            </div>
        </div>
    );
};

export default PixelMask;