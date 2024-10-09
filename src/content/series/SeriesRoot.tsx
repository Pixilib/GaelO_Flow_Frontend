/**
 * Component for the series root page to manage series API calls and display
 * @name SeriesRoot
 */
import React, { useState } from 'react';
import { useCustomQuery, useCustomMutation } from '../../utils/reactQuery';
import { getSeriesOfStudy, deleteSeries } from '../../services/orthanc';
import { Series } from '../../utils/types';
import SeriesTable from './SeriesTable';
import EditSeries from './EditSeries';
import PreviewSeries from './PreviewSeries';
import { useConfirm } from '../../services/ConfirmContextProvider';
import { useCustomToast } from '../../utils/toastify';
import { Modal, Spinner } from '../../ui';
import Tags from './Tags';
import { exportRessource, exportSeriesToNifti } from '../../services/export';

interface SeriesRootProps {
  studyId: string;
}

const SeriesRoot: React.FC<SeriesRootProps> = ({ studyId }) => {
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [previewSeries, setPreviewSeries] = useState<Series | null>(null);
  const [previewMetadata, setPreviewMetadata] = useState<Series | null>(null);

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

  const handleEditSeries = (series: Series) => {
    setEditingSeries(series);
  };

  const handlePreviewSeries = (series: Series) => {
    setPreviewSeries(series);
  }

  const handleDownloadSeries = (series: Series) => {
    const id = toastSuccess("Download started")
    exportRessource("series", series.id, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"))
  }

  const handleDownloadSeriesNifti = (series: Series) => {
    const id = toastSuccess("Download started", 60)
    exportSeriesToNifti(series.id, true, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb", 5))
  }

  const handleMetadataPreview = (series: Series) => {
    setPreviewMetadata(series)
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
        handleEditSeries(series);
        break;
      case 'delete':
        handleDeleteSeries(series.id);
        break;
      case 'preview':
        handlePreviewSeries(series);
        break;
      case 'metadata':
        setPreviewMetadata(series);
        break;
      case 'download':
        handleDownloadSeries(series);
        break;
      case 'download-nifti':
        handleDownloadSeriesNifti(series);
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
      {editingSeries && (
        <EditSeries
          series={editingSeries}
          onEditSeries={handleSeriesUpdate}
          onClose={() => setEditingSeries(null)}
          show={!!editingSeries}
        />
      )}
      {previewSeries && (
        <Modal show={!!previewSeries} size='xl'>
          <Modal.Header onClose={() => setPreviewSeries(null)} >
            <Modal.Title>Preview Series</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewSeries seriesId={previewSeries.id} />
          </Modal.Body>
        </Modal>
      )}

      {previewMetadata && (
        <Modal show={!!previewMetadata} size='xl'>
          <Modal.Header onClose={() => setPreviewMetadata(null)} >
            <Modal.Title>Preview Metadata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tags seriesId={previewMetadata.id} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default SeriesRoot;