import { useContext } from "react";
import { createVisit, getCreatableVisits } from "../../services/gaelo";
import { Button, Spinner } from "../../ui";
import { Colors, useCustomMutation, useCustomQuery } from "../../utils";
import GaelOContext from "./context/GaelOContext";
import { StudyMainDicomTags } from "../../utils/types";
import { formatDate } from "../../utils/export";

type GaelOVisitSummaryProps = {
  patientId: string;
  existingVisits: any[];
  studyMainDicomTag: StudyMainDicomTags;
  onVisitIdChange: (visitId: string) => void;
};

const GaelOVisitSummary = ({
  patientId,
  existingVisits,
  studyMainDicomTag,
  onVisitIdChange
}: GaelOVisitSummaryProps) => {

  const { token, studyName, role } = useContext(GaelOContext);

  const { data: creatableVisits, isPending } = useCustomQuery(
    ["gaelo", "patients", patientId, "creatable-visits"],
    () => getCreatableVisits(token, patientId),
  );

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
        onVisitIdChange(data.id);
      },
    }
  );

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl shadow-md">
        <div className="flex gap-3 items-center bg-gray-200 h-15 p-2 rounded-t-lg dark:bg-gray-600">
          <p className="text-sm text-gray-700 underline font-bold w-25 dark:text-white">Created : </p>
          {existingVisits.map((visit) => {
            return (
              <Button
                color={Colors.success}
                children={
                  <p>{visit?.visitType?.name}</p>
                }
                onClick={() => onVisitIdChange(visit.id)}
                className="text-xs"
              />
            );
          })}
        </div>
        <div className="flex gap-3 items-center bg-gray-300 h-15 p-2 rounded-b-lg dark:bg-gray-700">
          <p className="text-sm text-gray-700 underline font-bold w-25 dark:text-white">Creatable : </p>
          {creatableVisits?.map((visitType) => {
            return (
              <Button
                color={Colors.blueCustom}
                children={
                  <p>Create {visitType.name}</p>
                }
                className="text-xs"
                onClick={() => createVisitMutation(visitType)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GaelOVisitSummary;
