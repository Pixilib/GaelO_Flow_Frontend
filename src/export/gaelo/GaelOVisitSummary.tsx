import { useContext, useState } from "react";
import { createVisit, getCreatableVisits } from "../../services/gaelo";
import { Badge, Button, Spinner } from "../../ui";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import GaelOContext from "./context/GaelOContext";
import { StudyMainDicomTags } from "../../utils/types";
import { GaeloIcon } from "../../assets";
import Tus from "@uppy/tus";
import { exportRessourceToLocalFilesystem } from "../../services/export";

type GaelOVisitSummaryProps = {
  patientId: string;
  existingVisits: any[];
  studyMainDicomTag: StudyMainDicomTags;
  studyOrthancId: string;
};
const GaelOVisitSummary = ({
  patientId,
  existingVisits,
  studyMainDicomTag,
  studyOrthancId,
}: GaelOVisitSummaryProps) => {
  const { token, studyName, role } = useContext(GaelOContext);
  const [visit, setVisit] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);

  const { toastSuccess, toastError, updateExistingToast } = useCustomToast();

  const { data: creatableVisits, isPending } = useCustomQuery(
    ["gaelo", "patients", patientId, "creatable-visits"],
    () => getCreatableVisits(token, patientId),
  );

  function formatDate(yyyymmdd) {
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6);
    const day = yyyymmdd.slice(6, 8);

    const date = new Date(`${year}-${month}-${day}`);
    return date.toISOString().slice(0, 10);
  }

  const { mutate: createVisitMutation } = useCustomMutation(
    (visitType: any) => createVisit(
      token,
      studyName,
      role,
      visitType.id,
      patientId,
      "Done",
      formatDate(studyMainDicomTag.studyDate)
    ),
    [
      ["gaelo", "study", studyName, role],
      ["gaelo", "patients", patientId, "creatable-visits"],
    ],
    {
      onSuccess: (data) => {
        toastSuccess(`Visit created successfully`);
        setVisit(data.id);
      },
      onError: (error) => {
        toastError(`Failed to create visit: ${error}`);
      },
    }
  );

  const handleExport = async () => {
    const id = toastSuccess("Download started", 30)
    await exportRessourceToLocalFilesystem("studies", studyOrthancId, (mb) => {
      updateExistingToast(id, "Downloaded " + mb + " mb", 10)
    })
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <div className="flex gap-3 items-center">
        <p className="text-sm text-gray-700 underline">Created : </p>
        {existingVisits.map((visit) => {
          return <Badge variant="success">{visit?.visitType?.name}</Badge>;
        })}
      </div>
      <div className="flex gap-3 items-center">
        <p className="text-sm text-gray-700 underline">Creatable : </p>
        {creatableVisits?.map((visitType) => {
          return (
            <Button
              disabled={!!visit}
              color={Colors.blueCustom}
              children={
                <p>Create {visitType.name}</p>
              }
              className="text-xs"
              onClick={() => { setVisitType(visitType.name); createVisitMutation(visitType) }}
            />
          );
        })}
      </div>
      {visit &&
        <Button
          color={Colors.success}
          onClick={handleExport}
          children={
            <div className="flex flex-row items-center gap-1">
              <p>Send DICOM to</p>
              <GaeloIcon />
              <p>({visitType})</p>
            </div>
          }
        />
      }
    </>
  );
};

export default GaelOVisitSummary;
