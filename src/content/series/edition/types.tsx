type Coordinates = {
    x: number;
    y: number;
    z: number;
};

type PixelMaskType = {
    dimension: string | null; // "2D" or "3D"
    maskType: string | null; // "MeanFilter" or "Fill"
    maskTypeValue: number | null; // Value for the mask
    start: Coordinates | null; // Start coordinates
    end: Coordinates | null; // End coordinates
};

export type { PixelMaskType };
export type { Coordinates };

export type customTags = {
    [key: string]: string | number
}
