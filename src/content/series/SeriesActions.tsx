// SeriesActions.tsx
import React from 'react';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { RiDownload2Line as DownloadIcon } from "react-icons/ri";
import { Series } from "../../utils/types";
import DropdownButton from '../../ui/menu/DropDownButton';

type SeriesActionsProps = {
    series: Series;
    onActionClick: (action: string, series: Series) => void;
};

const SeriesActions: React.FC<SeriesActionsProps> = ({ series, onActionClick }) => {
    const options = [
        {
            label: 'Modify',
            icon: <FaEdit />,
            color: 'orange',
            action: () => onActionClick('edit', series)
        },
        {
            label: 'Metadata',
            icon: <FaEye />,
            color: 'green',
            action: () => onActionClick('metadata', series),
        },
        {
            label: 'Preview Series',
            icon: <FaEye />,
            color: 'green',
            action: () => onActionClick('preview', series),
        },
        {
            label: 'Download',
            icon: <DownloadIcon />,
            color: 'green',
            action: () => onActionClick('download', series)
        },
        {
            label: 'Download Nifti',
            icon: <DownloadIcon />,
            color: 'green',
            action: () => onActionClick('download-nifti', series)
        },
        {
            label: 'Delete',
            icon: <FaTrash />,
            color: 'red',
            action: () => onActionClick('delete', series)
        }
    ];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div onClick={handleClick}>
            <DropdownButton
                options={options}
                buttonText="Actions"
                row={series}
            />
        </div>
    );
};

export default SeriesActions;