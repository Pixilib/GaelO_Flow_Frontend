type Coordinates3D = {
    x: number;
    y: number;
    z: number;
};

type Coordinates2D = {
    x: number;
    y: number;
};

type PixelMaskType = {
    dimension: string | null; // "2D" or "3D"
    maskType: string | null; // "MeanFilter" or "Fill"
    maskTypeValue: number | null; // Value for the mask
    start: Coordinates3D | Coordinates2D | null; // Start coordinates
    end: Coordinates3D | Coordinates2D | null; // End coordinates
};

export type { PixelMaskType };
export type { Coordinates3D, Coordinates2D };

export type customTags = {
    [key: string]: string | number
}
