import { useState } from "react";
import EditStudy from "../../content/studies/EditStudy";
import PreviewStudy from "../../content/studies/PreviewStudy";
import AiStudy from "../../content/studies/AiStudy";
import DatasetTableStudy from "./DatasetTableStudy";
import Study from "../../model/Study";
import { useCustomToast } from "../../utils";
import { exportRessource } from "../../services/export";

type StudyRootProps = {
  studies: Study[];
  onRowClick: (studyId: string) => void;
  onStudyUpdated: () => void;
  selectedStudyId: string | null;
  onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void;
  selectedRow?: Record<string, boolean>;
};

const DatasetStudyRoot = ({
  studies,
  onRowClick,
  selectedStudyId,
  onStudyUpdated,
  onRowSelectionChange,
  selectedRow
}: StudyRootProps) => {

  const { toastSuccess, updateExistingToast } = useCustomToast();
  const [editingStudyId, setEditingStudyId] = useState<string | null>(null);
  const [aiStudyId, setAIStudyId] = useState<string | null>(null);
  const [previewStudyId, setPreviewStudyId] = useState<string | null>(null);

  const handleDownloadStudy = (studyId: string) => {
    const id = toastSuccess("Download started, follow progression in console");
    exportRessource("studies", studyId, (mb) =>
      updateExistingToast(id, `Downloaded ${mb} mb`)
    );
  };

  const onActionClick = (action: string, studyId: string) => {
    switch (action) {
      case "edit":
        setEditingStudyId(studyId);
        break;
      case "preview":
        setPreviewStudyId(studyId);
        break;
      case "ai":
        setAIStudyId(studyId);
        break;
      case "download":
        handleDownloadStudy(studyId);
        break;
      default:
        break;
    }
  }

  return (
    <>
      {editingStudyId && (
        <EditStudy
          studyId={editingStudyId}
          onStudyUpdated={onStudyUpdated}
          onClose={() => setEditingStudyId(null)}
          show={!!editingStudyId}
          defaultKeepLabels
        />
      )}
      {previewStudyId && (
        <PreviewStudy
          studyId={previewStudyId}
          onClose={() => setPreviewStudyId(null)}
          show={!!previewStudyId}
        />
      )}
      {aiStudyId && (
        <AiStudy
          studyId={aiStudyId}
          onClose={() => setAIStudyId(null)}
          show={!!aiStudyId}
        />
      )}
      <DatasetTableStudy
        studies={studies}
        onRowClick={onRowClick}
        onActionClick={onActionClick}
        selectedStudyId={selectedStudyId}
        onRowSelectionChange={onRowSelectionChange}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default DatasetStudyRoot;
