// SeriesActions.tsx
import React from 'react';
import { Series } from "../../utils/types";
import DropdownButton from '../../ui/menu/DropDownButton';
import { Download, Edit, Eye, Label, Trash } from '../../icons';

type SeriesActionsProps = {
    series: Series;
    onActionClick: (action: string, series: Series) => void;
};

const SeriesActions: React.FC<SeriesActionsProps> = ({ series, onActionClick }) => {
    const options = [
        {
            label: 'Labels',
            icon: <Label />,
            color: 'bg-indigo-500',
            action: () => setLabelsModalOpen(true)      
          },
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
            action: () => onActionClick('metadata', series),
        },
        {
            label: 'Preview Series',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', series),
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
                row={series}
            />
        </div>
    );
};

export default SeriesActions;

function setLabelsModalOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
}
