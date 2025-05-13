/**
 * Component for a modal to edit a series
 * @name EditSeries
 */

import React, { useState } from "react";
import { getSeries, modifySeries } from "../../../services/orthanc";
import {
  useCustomMutation,
  useCustomToast,
  Series,
  useCustomQuery,
} from "../../../utils";
import SeriesEditForm from "./SeriesEditForm";
import { Modal, Spinner } from "../../../ui";
import { SeriesModifyPayload } from "../../../utils/types";

type EditSeriesProps = {
  seriesId: string;
  onSeriesEdited: (seriesId: string) => void;
  onClose: () => void;
  show: boolean;
};

const EditSeries: React.FC<EditSeriesProps> = ({
  seriesId,
  onSeriesEdited,
  onClose,
  show,
}) => {
  const { toastSuccess, toastError } = useCustomToast();
  const [jobId, setJobId] = useState<string | null>(null);

  const { data: series, isPending } = useCustomQuery<Series>(
    ["series", seriesId],
    () => getSeries(seriesId)
  );

  const { mutateAsync: mutateSeries } = useCustomMutation<
    any,
    { id: string; payload: SeriesModifyPayload }
  >(
    ({ id, payload }) => modifySeries(id, payload, payload.transcode),
    [["series"], ["jobs"]],
    {
      onSuccess: (data) => {
        setJobId(data.id);
      },
      onError: (error) => {
        toastError(`Failed to update series ${error}`);
      },
    }
  );

  const handleSubmit = ({
    id,
    payload,
  }: {
    id: string;
    payload: SeriesModifyPayload;
  }) => {
    mutateSeries({ id, payload });
  };

  const handleJobCompletion = (job: string) => {
    if (job === "Success") {
      onSeriesEdited(seriesId);
      onClose();
      toastSuccess(`Series updated successfully`);
    } else if (job === "Failure") {
      toastError(`Failed to update series ${seriesId}`);
    }
  };

  if (isPending) return <Spinner />;

  return (
    <Modal show={show} size="xl">
      <Modal.Header onClose={onClose}> Edit series </Modal.Header>
      <Modal.Body>
        <SeriesEditForm
          data={series}
          onSubmit={handleSubmit}
          jobId={jobId ?? undefined}
          onJobCompleted={handleJobCompletion}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditSeries;
