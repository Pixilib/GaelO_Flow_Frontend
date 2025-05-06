import { useState } from "react";
import EditStudy from "../../content/studies/EditStudy";
import PreviewStudy from "../../content/studies/PreviewStudy";
import AiStudy from "../../content/studies/AiStudy";
import DatasetTableStudy from "./DatasetTableStudy";

type StudyRootProps = {
  studies: Study[];
  onRowClick: (studyId: string) => void;
  selectedStudyId: string | null;
};

const DatasetStudyRoot = ({
  studies,
  onRowClick,
  selectedStudyId,
}: StudyRootProps) => {
  const [editingStudy, setEditingStudy] = useState<string | null>(null);
  const [aiStudyId, setAIStudyId] = useState<string | null>(null);
  const [previewStudyId, setPreviewStudyId] = useState<string | null>(null);

  return (
    <>
      {editingStudy && (
        <EditStudy
          studyId={editingStudy}
          onStudyUpdated={handleStudyEdit}
          onClose={() => setEditingStudy(null)}
          show={!!editingStudy}
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
      />
    </>
  );
};

export default DatasetStudyRoot;
