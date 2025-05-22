import { useMemo, useState } from "react";

import { useCustomMutation } from "../../utils/reactQuery";
import { useCustomToast } from "../../utils/toastify";

import { deleteStudy } from "../../services/orthanc";
import { exportRessource } from "../../services/export";
import { useConfirm } from "../../services/ConfirmContextProvider";

import Patient from "../../model/Patient";
import StudyTable from "./StudyTable";
import EditStudy from "./EditStudy";
import PreviewStudy from "./PreviewStudy";
import AiStudy from "./AiStudy";
import CreateSerie from "./create-serie/CreateSerie";

type StudyRootProps = {
  patient: Patient;
  currentActiveStudyId: string | null;
  onStudyUpdated: () => void;
  onStudySelected?: (studyId: string) => void;
  selectedStudies: { [studyId: string]: boolean };
  onSelectedStudyChange: (selectedState: {
    [studyId: string]: boolean;
  }) => void;
};

const StudyRoot = ({
  patient,
  currentActiveStudyId,
  onStudyUpdated,
  selectedStudies,
  onStudySelected,
  onSelectedStudyChange,
}: StudyRootProps) => {
  const [editingStudy, setEditingStudy] = useState<string | null>(null);
  const [aiStudyId, setAIStudyId] = useState<string | null>(null);
  const [previewStudyId, setPreviewStudyId] = useState<string | null>(null);
  const [creatingSerieId, setCreatingSerieId] = useState<string | null>(null);

  const { confirm } = useConfirm();
  const { toastSuccess, toastError, updateExistingToast } = useCustomToast();

  const studies = useMemo(() => {
    onStudySelected(null)
    return patient.getStudies().map((study) => study.toJSON());
  }, [patient]);

  const { mutate: mutateDeleteStudy } = useCustomMutation<void, { id: string }>(
    ({ id }) => deleteStudy(id),
    [[]],
    {
      onSuccess: () => {
        toastSuccess("Study deleted successfully");
        onStudyUpdated();
      },
      onError: () => {
        toastError("Failed to delete study");
      },
    }
  );

  const handleRowClick = (studyId: string) => {
    onStudySelected && onStudySelected(studyId);
  };

  const handleDeleteStudy = async (studyId: string) => {
    const studyDescription = studies.find((study) => study.id === studyId)?.studyDescription;
    const confirmContent = (
      <div className="flex gap-2 text-xl">
        Are you sure you want to delete this study:
        <span className="font-bold text-primary">
          {studyDescription}?
        </span>
      </div>
    );
    if (await confirm({ content: confirmContent })) {
      mutateDeleteStudy({ id: studyId });
    }
  };

  const handlePreviewStudy = (studyId: string) => {
    setPreviewStudyId(studyId);
  };

  const handleAIStudy = (studyId: string) => {
    setAIStudyId(studyId);
  };

  const handleDownloadStudy = (studyId: string) => {
    const id = toastSuccess("Download started, follow progression in console");
    exportRessource("studies", studyId, (mb) =>
      updateExistingToast(id, `Downloaded ${mb} mb`)
    );
  };

  const handleCreateStudy = (studyId: string) => {
    setCreatingSerieId(studyId);
  };


  const handleStudyAction = (action: string, studyId: string) => {
    switch (action) {
      case "edit":
        setEditingStudy(studyId);
        break;
      case "delete":
        handleDeleteStudy(studyId);
        break;
      case "preview":
        handlePreviewStudy(studyId);
        break;
      case "ai":
        handleAIStudy(studyId);
        break;
      case "createSerie":
        handleCreateStudy(studyId);
        break;
      case "download":
        handleDownloadStudy(studyId);
        break;
      default:
        break;
    }
  };

  const handleStudyEdit = () => {
    onStudyUpdated();
    setEditingStudy(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <StudyTable
          studies={studies}
          currentActiveStudyId={currentActiveStudyId}
          onRowClick={handleRowClick}
          onActionClick={handleStudyAction}
          selectedRows={selectedStudies}
          onRowSelectionChange={onSelectedStudyChange}
        />
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
        {creatingSerieId && (
          <CreateSerie
            studyId={creatingSerieId}
            onClose={() => setCreatingSerieId(null)}
            show={!!creatingSerieId}
          />
        )}
      </div>
    </div>
  );
};

export default StudyRoot;
