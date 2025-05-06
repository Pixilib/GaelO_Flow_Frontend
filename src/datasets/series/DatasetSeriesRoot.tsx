import DatasetSeriesTable from "./DatasetSeriesTable";
import { Series, useCustomToast } from "../../utils";
import { useState } from "react";
import { Modal } from "../../ui";
import TagsTree from "../../content/series/metadata/TagsTree";
import PreviewSeries from "../../content/series/preview/PreviewSeries";
import EditSeries from "../../content/series/edition/EditSeries";
import { useConfirm } from "../../services";
import { exportRessource, exportSeriesToNifti } from "src/services/export";

type DatasetSeriesRootProps = {
  series: Series[];
};

const DatasetSeriesRoot = ({ series }: DatasetSeriesRootProps) => {
  const [editingSeries, setEditingSeries] = useState<string | null>(null);
  const [previewSeries, setPreviewSeries] = useState<string | null>(null);
  const [previewMetadata, setPreviewMetadata] = useState<string | null>(null);

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
        setEditingSeries(seriesId);
        break;
      case "preview":
        setPreviewSeries(seriesId);
        break;
      case "metadata":
        setPreviewMetadata(seriesId);
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
      {editingSeries && (
        <EditSeries
          series={editingSeries}
          onSeriesEdited={() => {}}
          onClose={() => setEditingSeries(null)}
          show={!!editingSeries}
        />
      )}
      {previewSeries && (
        <Modal show={!!previewSeries} size="xl">
          <Modal.Header onClose={() => setPreviewSeries(null)}>
            <Modal.Title>Preview Series</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewSeries seriesId={previewSeries.id} />
          </Modal.Body>
        </Modal>
      )}

      {previewMetadata && (
        <Modal show={!!previewMetadata} size="xl">
          <Modal.Header onClose={() => setPreviewMetadata(null)}>
            <Modal.Title>Preview Metadata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TagsTree seriesId={previewMetadata.id} />
          </Modal.Body>
        </Modal>
      )}
      <DatasetSeriesTable series={series} onActionClick={handleSeriesAction} />
    </>
  );
};
export default DatasetSeriesRoot;
