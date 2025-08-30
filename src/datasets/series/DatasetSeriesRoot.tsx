import DatasetSeriesTable from "./DatasetSeriesTable";
import { Series, useCustomToast } from "../../utils";
import { useState } from "react";
import { Modal } from "../../ui";
import TagsTree from "../../content/series/metadata/TagsTree";
import PreviewSeries from "../../content/series/preview/PreviewSeries";
import EditSeries from "../../content/series/edition/EditSeries";
import { useConfirm } from "../../services";
import { exportRessource, exportSeriesToNifti } from "../../services/export";

type DatasetSeriesRootProps = {
  series: Series[];
  onSeriesEdited : () => void;
};

const DatasetSeriesRoot = ({ series, onSeriesEdited }: DatasetSeriesRootProps) => {
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
  const [previewSeriesId, setPreviewSeriesId] = useState<string | null>(null);
  const [previewMetadataSeriesId, setPreviewMetadataSeriesId] = useState<string | null>(null);

    const { confirm } = useConfirm();
    const { toastSuccess, toastError, updateExistingToast } = useCustomToast();

    const handleDownloadSeries = (seriesId :string) => {
      const id = toastSuccess("Download started")
      exportRessource("series", seriesId, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"))
    }
  
    const handleDownloadSeriesNifti = (seriesId :string) => {
      const id = toastSuccess("Download started", 60)
      exportSeriesToNifti(seriesId, true, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb", 5))
    }

  const handleSeriesAction = (action: string, seriesId :string) => {
    switch (action) {
      case "edit":
        setEditingSeriesId(seriesId);
        break;
      case "preview":
        setPreviewSeriesId(seriesId);
        break;
      case "metadata":
        setPreviewMetadataSeriesId(seriesId);
        break;
      case "download":
        handleDownloadSeries(seriesId);
        break;
      case "download-nifti":
        handleDownloadSeriesNifti(seriesId);
        break;
      default:
        console.warn(`Unhandled action: ${action}`);
    }
  };

  return (
    <>
      {editingSeriesId && (
        <EditSeries
          seriesId={editingSeriesId}
          onSeriesEdited={onSeriesEdited}
          onClose={() => setEditingSeriesId(null)}
          show={!!editingSeriesId}
        />
      )}
      {previewSeriesId && (
        <Modal show={!!previewSeriesId} size="xl">
          <Modal.Header onClose={() => setPreviewSeriesId(null)}>
            <Modal.Title>Preview Series</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewSeries seriesId={previewSeriesId} />
          </Modal.Body>
        </Modal>
      )}

      {previewMetadataSeriesId && (
        <Modal show={!!previewMetadataSeriesId} size="xl">
          <Modal.Header onClose={() => setPreviewMetadataSeriesId(null)}>
            <Modal.Title>Preview Metadata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TagsTree seriesId={previewMetadataSeriesId} />
          </Modal.Body>
        </Modal>
      )}
      <DatasetSeriesTable series={series} onActionClick={handleSeriesAction} />
    </>
  );
};
export default DatasetSeriesRoot;
