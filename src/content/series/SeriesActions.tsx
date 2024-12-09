import React from 'react';
import { Series } from "../../utils/types";
import { Download, Edit, Eye, Trash } from '../../icons';
import { DropdownButton } from '../../ui';

type SeriesActionsProps = {
    series: Series;
    onActionClick: (action: string, series: Series) => void;
};

const SeriesActions: React.FC<SeriesActionsProps> = ({ series, onActionClick }) => {


    const options = [
        
        {
            label: 'Modify',
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', series)
        },
        {
            label: 'Metadata',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('metadata', series)
        },
        {
            label: 'Preview Series',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', series)
        },
        {
            label: 'Download',
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download', series)
        },
        {
            label: 'Download Nifti',
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download-nifti', series)
        },
        {
            label: 'Delete',
            icon: <Trash />,
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
            />
        </div>
    );
};

export default SeriesActions;
