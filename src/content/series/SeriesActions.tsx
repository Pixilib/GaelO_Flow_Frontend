import React from 'react';
import { Series } from "../../utils/types";
import { Download, Edit, Eye, Trash } from '../../icons';
import { DropdownButton } from '../../ui';
import { useTranslation } from "react-i18next";

type SeriesActionsProps = {
    series: Series;
    onActionClick: (action: string, series: Series) => void;
};

const SeriesActions: React.FC<SeriesActionsProps> = ({ series, onActionClick }) => {

    const {t} = useTranslation()

    const options = [
        
        {
            label: t("contents.modify"),
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', series)
        },
        {
            label: t("contents.metadata"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('metadata', series)
        },
        {
            label: t("contents.preview-series"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', series)
        },
        {
            label: t("contents.download"),
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download', series)
        },
        {
            label: t("contents.download-nifti"),
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download-nifti', series)
        },
        {
            label: t("contents.delete"),
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
