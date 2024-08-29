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
import { Spinner } from '../../ui';

interface SeriesRootProps {
  studyId: string;
}

const SeriesRoot: React.FC<SeriesRootProps> = ({ studyId }) => {
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [previewSeries, setPreviewSeries] = useState<Series | null>(null);

  const { confirm } = useConfirm();
  const { toastSuccess, toastError } = useCustomToast();
  
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
      onSuccess: (_, variables) => {
        toastSuccess('Series deleted successfully' + variables);
        refetchSeries();
      },
      onError: (error: any) => {
        toastError(`Failed to delete series ${error}`);
      },
    }
  );

  const handleEditSeries = (series: Series) => {
    setEditingSeries(series);
  };

  const handlePreviewSeries = (series: Series) => {
    setPreviewSeries(series);
  }

  const handleDeleteSeries = async (seriesId: string) => {
    const confirmContent = (
      <div className="italic">
          Are you sure you want to delete this Series:
          <span className="text-xl not-italic font-bold text-primary">{seriesId} ?</span>
      </div>
  );
  if (await confirm({content: confirmContent})) {
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
      default:
        console.log(`Unhandled action: ${action}`);
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
        <PreviewSeries
          seriesId={previewSeries.id}
          onClose={() => setPreviewSeries(null)}
          show={!!previewSeries}
          />
      )}
    </div>
  );
};

export default SeriesRoot;