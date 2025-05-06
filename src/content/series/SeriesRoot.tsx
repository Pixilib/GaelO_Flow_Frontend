/**
 * Component for the series root page to manage series API calls and display
 * @name SeriesRoot
 */
import React, { useState } from 'react';
import { useCustomQuery, useCustomMutation } from '../../utils/reactQuery';
import { getSeriesOfStudy, deleteSeries } from '../../services/orthanc';
import { Series } from '../../utils/types';
import SeriesTable from './SeriesTable';
import EditSeries from './edition/EditSeries';
import PreviewSeries from './preview/PreviewSeries';
import { useConfirm } from '../../services/ConfirmContextProvider';
import { useCustomToast } from '../../utils/toastify';
import { Modal, Spinner } from '../../ui';
import TagsTree from './metadata/TagsTree';
import { exportRessource, exportSeriesToNifti } from '../../services/export';

type SeriesRootProps = {
  studyId: string;
}

const SeriesRoot: React.FC<SeriesRootProps> = ({ studyId }) => {
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
  const [previewSeriesId, setPreviewSeriesId] = useState<string | null>(null);
  const [previewMetadataSeriesId, setPreviewMetadataSeriesId] = useState<string | null>(null);

  const { confirm } = useConfirm();
  const { toastSuccess, toastError, updateExistingToast } = useCustomToast();

  const { data: seriesList, isLoading, refetch: refetchSeries } = useCustomQuery<Series[]>(
    ['series', studyId],
    () => getSeriesOfStudy(studyId),
    {
      onError: (error) => {
        console.error(`No series for this study or an error occured: ${error}`);
      }
    }
  );
  const { mutate: mutateDeleteSeries } = useCustomMutation<void, string>(
    (id) => deleteSeries(id),
    [],
    {
      onSuccess: () => {
        toastSuccess('Series deleted successfully');
        refetchSeries();
      },
      onError: () => {
        toastError(`Failed to delete series`);
      },
    }
  );

  const handleEditSeries = (seriesId :string) => {
    setEditingSeriesId(seriesId);
  };

  const handlePreviewSeries = (seriesId :string) => {
    setPreviewSeriesId(seriesId);
  }

  const handleDownloadSeries = (seriesId :string) => {
    const id = toastSuccess("Download started")
    exportRessource("series", seriesId, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"))
  }

  const handleDownloadSeriesNifti = (seriesId :string) => {
    const id = toastSuccess("Download started", 60)
    exportSeriesToNifti(seriesId, true, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb", 5))
  }

  const handleDeleteSeries = async (seriesId: string) => {
    const confirmContent = (
      <div className="italic">
        Are you sure you want to delete this Series:
        <span className="text-xl not-italic font-bold text-primary">{seriesId} ?</span>
      </div>
    );
    if (await confirm({ content: confirmContent })) {
      mutateDeleteSeries(seriesId);
    }
  };


  const handleSeriesAction = (action: string, series: Series) => {
    switch (action) {
      case 'edit':
        handleEditSeries(series.id);
        break;
      case 'delete':
        handleDeleteSeries(series.id);
        break;
      case 'preview':
        handlePreviewSeries(series.id);
        break;
      case 'metadata':
        setPreviewMetadataSeriesId(series.id);
        break;
      case 'download':
        handleDownloadSeries(series.id);
        break;
      case 'download-nifti':
        handleDownloadSeriesNifti(series.id);
        break;
      default:
        console.warn(`Unhandled action: ${action}`);
    }
  };

  const handleSeriesUpdate = () => {
    refetchSeries();
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={``}>
      {seriesList && seriesList.length > 0 ? (
        <SeriesTable
          series={seriesList}
          onActionClick={handleSeriesAction}
        />
      ) : (
        <p>No series found for this study.</p>
      )}
      {editingSeriesId && (
        <EditSeries
          seriesId={editingSeriesId}
          onSeriesEdited={handleSeriesUpdate}
          onClose={() => setEditingSeriesId(null)}
          show={!!editingSeriesId}
        />
      )}
      {previewSeriesId && (
        <Modal show={!!previewSeriesId} size='xl'>
          <Modal.Header onClose={() => setPreviewSeriesId(null)} >
            <Modal.Title>Preview Series</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewSeries seriesId={previewSeriesId} />
          </Modal.Body>
        </Modal>
      )}

      {previewMetadataSeriesId && (
        <Modal show={!!previewMetadataSeriesId} size='xl'>
          <Modal.Header onClose={() => setPreviewMetadataSeriesId(null)} >
            <Modal.Title>Preview Metadata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TagsTree seriesId={previewMetadataSeriesId} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default SeriesRoot;