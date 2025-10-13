import { useMemo, useState, useEffect } from "react";

import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { useCustomToast } from "../../utils/toastify";

import { deleteStudy, getStudy } from "../../services/orthanc";
import { exportRessource } from "../../services/export";
import { useConfirm } from "../../services/ConfirmContextProvider";

import Patient from "../../model/Patient";
import StudyTable from "./StudyTable";
import EditStudy from "./EditStudy";
import PreviewStudy from "./PreviewStudy";
import AiStudy from "./AiStudy";
import CreateSerie from "./create-serie/CreateSerie";
import { useTranslation } from "react-i18next";
import { postCdBurnerJob } from "../../services/cd-burner";
import { StudyMainDicomTags } from "../../utils/types";

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
  const [burningStudy, setBurningStudy] = useState<(StudyMainDicomTags & { id: string }) | null>(null);

  const { confirm } = useConfirm();
  const { toastSuccess, toastError, updateExistingToast } = useCustomToast();
  const { t } = useTranslation()

  const studies = useMemo(() => {
    onStudySelected(null)
    return patient.getStudies().map((study) => study.toJSON());
  }, [patient]);

  const { data: studyDataForBurn, isLoading: isLoadingBurnData } = useCustomQuery(
    ["study", burningStudy?.id],
    () => getStudy(burningStudy!.id),
    {
      enabled: !!burningStudy,
    }
  );

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

  const handleBurnStudy = (study: StudyMainDicomTags & { id: string }) => {
    setBurningStudy(study);
  };

  const handleBurnConfirmation = async (study: StudyMainDicomTags & { id: string }, studyData: any) => {
    const data = [
      { key: 'Patient Name', value: studyData.patientMainDicomTags?.patientName },
      { key: 'Study Description', value: study.studyDescription },
      { key: 'Study Date', value: study.studyDate },
    ];

    const confirmContent = (
      <div>
        <span className="text-xl not-italic font-bold">
          {t("contents.burn-study-confirmation")}
        </span>
        <table className="mt-4">
          <tbody>
            {data.map((item) => (
              <tr key={item.key} className="border-b border-t border-gray-200">
                <td className="px-4 py-2 font-bold text-gray-700 dark:text-gray-300">{item.key}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    if (await confirm({ content: confirmContent })) {
      postCdBurnerJob(study.id, "Study").then(() => {
        toastSuccess("CD Burner job created");
      }).catch((e) => {
        toastError(`Failed to create CD Burner job: ${e.statusText}`);
      });
    }

    setBurningStudy(null);
  };

  useEffect(() => {
    if (burningStudy && studyDataForBurn && !isLoadingBurnData) {
      handleBurnConfirmation(burningStudy, studyDataForBurn);
    }
  }, [burningStudy, studyDataForBurn, isLoadingBurnData]);

  const handleStudyAction = (action: string,  study: StudyMainDicomTags & { id: string }) => {
    switch (action) {
      case "edit":
        setEditingStudy(study.id);
        break;
      case "delete":
        handleDeleteStudy(study.id);
        break;
      case "preview":
        handlePreviewStudy(study.id);
        break;
      case "ai":
        handleAIStudy(study.id);
        break;
      case "createSerie":
        handleCreateStudy(study.id);
        break;
      case "download":
        handleDownloadStudy(study.id);
        break;
      case "burn":
        handleBurnStudy(study);
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
