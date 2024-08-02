// SeriesActions.tsx
import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
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
            label: 'Delete',
            icon: <FaTrash />,
            color: 'red',
            action: () => onActionClick('delete', series)
        },
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