import { useContext, useState } from "react";
import { createVisit, getCreatableVisits, getGaelOPatientLink } from "../../../services/gaelo";
import { Button, Card, CardBody, CardHeader, Spinner } from "../../../ui";
import { Colors, useCustomMutation, useCustomQuery } from "../../../utils";
import GaelOContext from "../context/GaelOContext";
import { StudyMainDicomTags } from "../../../utils/types";
import GaelOVisitCreateForm, { CreateVisitForm } from "../visits/GaelOVisitCreateForm";
import { GaeloIcon } from "../../../assets";

type GaelOPatientVisitsProps = {
  patientId: string;
  existingVisits: any[];
  studyMainDicomTag: StudyMainDicomTags;
  onVisitIdChange: (visitId: string) => void;
};

const GaelOPatientVisits = ({
  patientId,
  existingVisits,
  studyMainDicomTag,
  onVisitIdChange
}: GaelOPatientVisitsProps) => {
  const { token, studyName, role, userId } = useContext(GaelOContext);
  const [createFormVisit, setCreateFormVisit] = useState<Record<string, any> | null>(null);

  const { data: creatableVisits, isPending } = useCustomQuery(
    ["gaelo", "patients", patientId, "creatable-visits"],
    () => getCreatableVisits(token, patientId),
  );

  const { mutate: createVisitMutation } = useCustomMutation(
    (form: CreateVisitForm) => createVisit(
      token,
      studyName,
      role,
      form.visitId,
      patientId,
      form.status,
      form.date ? form.date : null,
      form?.reasonForNotDone === "Other" ? form.otherReasonForNotDone : form.reasonForNotDone
    ),
    [
      ["gaelo", "study", studyName, role],
      ["gaelo", "patients", patientId, "creatable-visits"],
    ],
    {
      onSuccess: (data) => {
        onVisitIdChange(data.id);
        setCreateFormVisit(null);
      },
    }
  );

  const handleCreateVisit = (form: CreateVisitForm) => {
    createVisitMutation(form);
  }

  const handleCreatedVisitClick = (visitId: any) => {
    setCreateFormVisit(null);
    onVisitIdChange(visitId);
  }

  const handleClickCreatableVisitList = (visitType: Record<string, any>) => {
    setCreateFormVisit(visitType)
    onVisitIdChange(null);
  }

  const handleOpenPatientInGaelO = () => {
    window.open(getGaelOPatientLink(studyName, role, patientId, token, userId));
  }

  if (isPending) return <Spinner />;

  return (
    <div className="flex w-full h-full flex-col gap-3">
      <Card>
        <CardHeader color={Colors.primary} className="flex items-center justify-between text-white pl-3 pr-3">
          <div className="font-bold" >Patient : {patientId}</div>
          <Button
            className="h-10"
            color={Colors.warning}
            children={
              <div className="text-sm flex flex-row gap-0.5 items-center">
                <p>Open patient in</p>
                <span className="mb-0.5"><GaeloIcon className="h-3.5" /></span>
              </div>
            }
            onClick={handleOpenPatientInGaelO}
          />
        </CardHeader>
        <CardBody>
          <p className="font-bold text-lg">Visits</p>
          <div className="flex gap-3 items-center h-15 rounded-t-lg dark:bg-gray-600 pl-3">
            <p className="text-sm text-gray-700 underline font-bold w-25 dark:text-white">Created : </p>
            {existingVisits.map((visit) => {
              return (
                <Button
                  color={Colors.success}
                  children={
                    <p>{visit?.visitType?.name}</p>
                  }
                  onClick={() => handleCreatedVisitClick(visit.id)}
                  className="text-xs"
                />
              );
            })}
          </div>
          <div className="flex gap-3 items-center h-15 rounded-b-lg dark:bg-gray-700 pl-3">
            <p className="text-sm text-gray-700 underline font-bold w-25 dark:text-white">Creatable : </p>
            {creatableVisits?.map((visitType) => {
              return (
                <Button
                  color={Colors.blueCustom}
                  children={
                    <p>Create {visitType.name}</p>
                  }
                  className="text-xs"
                  onClick={() => handleClickCreatableVisitList(visitType)}
                />
              );
            })}
          </div>
        </CardBody>
      </Card>
      {createFormVisit &&
        <GaelOVisitCreateForm
          visitType={createFormVisit}
          key={createFormVisit.id + ' ' + patientId}
          studyMainDicomTag={studyMainDicomTag}
          onCreateVisit={handleCreateVisit}
        />
      }
    </div>
  );
};

export default GaelOPatientVisits;
