/**
 * Component for a modal to edit a series
 * @name EditSeries
 */

import React from "react";
import { Series, SeriesPayload } from "../../utils/types";
import { modifySeries } from "../../services/orthanc";
import { useCustomMutation, useCustomToast } from "../../utils";
import SeriesEditForm from './SeriesEditForm';
import { Modal } from "../../ui";

type EditSeriesProps = {
    series: Series;
    onEditSeries: (series: Series) => void;
    onClose: () => void;
    show: boolean;
}

const EditSeries: React.FC<EditSeriesProps> = ({ series, onEditSeries, onClose, show }) => {
    const { toastSuccess, toastError } = useCustomToast();

    const { mutateAsync: mutateSeries } = useCustomMutation<any, { id: string, payload: SeriesPayload }>(
        ({ id, payload }) => modifySeries(id, payload),
        [['series'], ['jobs']],
        {
            onSuccess: (data) => {
                toastSuccess(`Series ${series.id} updated successfully ${data}`);
                onEditSeries(series);
                onClose();
            },
            onError: (error) => {
                toastError(`Failed to update series ${series.id} ${error}`);
            },
        }
    );

    const handleSubmit = ({ id, payload }: { id: string; payload: SeriesPayload }) => {
        mutateSeries({ id, payload });
    };

    return (

        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose} > Edit series </Modal.Header>
            <Modal.Body>
                <SeriesEditForm data={series} onSubmit={handleSubmit} onCancel={onClose} />
            </Modal.Body>
        </Modal>
    );
};

export default EditSeries;