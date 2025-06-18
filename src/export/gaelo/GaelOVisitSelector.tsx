import { useContext, useEffect, useMemo, useState } from "react";
import { Spinner } from "../../ui";
import { useCustomQuery } from "../../utils";
import { getVisitsTree } from "../../services/gaelo";
import GaelOContext from "./context/GaelOContext";
import PatientTable from "./patients/PatientTable";
import GaelOVisitSummary from "./GaelOVisitSummary";
import { StudyMainDicomTags } from "../../utils/types";

type GaelOVisitSelectorProps = {
  studyMainDicomTag: StudyMainDicomTags
  onVisitIdChange: (visitId: string) => void;
};

const GaelOVisitSelector = ({
  studyMainDicomTag,
  onVisitIdChange,
}: GaelOVisitSelectorProps) => {

  const { studyName, token, role } = useContext(GaelOContext);
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPatientId(null);
  }, [studyName]);

  const { data: visitTree, isPending } = useCustomQuery(
    ["gaelo", "study", studyName, role],
    () => getVisitsTree(token, studyName, role)
  );

  const patients = useMemo(() => {
    if (!visitTree) return [];
    return Object.values(visitTree.patients);
  }, [visitTree]);

  const handlePatientClick = (patientId: string) => {
    setCurrentPatientId(patientId);
  };

  const visitsOfPatient = useMemo(() => {
    if (!visitTree) return [];
    const visitsOfPatient = Object.values(visitTree.visits).filter(
      (visit: any) => visit.patientId === currentPatientId
    );
    return visitsOfPatient;
  }, [currentPatientId, visitTree]);

  useEffect(() => {
    onVisitIdChange(null);
  }, [currentPatientId]);

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-3">
      {studyName ? (
        <PatientTable
          patients={patients}
          patientId={currentPatientId}
          onRowClick={handlePatientClick}
        />
      ) : (
        <div className="w-full">
          <p className="text-dark dark:text-white">Please select a study first.</p>
        </div>
      )}
      {studyName &&
        <div className="flex items-center w-full">
          <div className="w-full">
            <h1 className="font-bold text-dark text-l dark:text-white" >Visits :</h1>
            {currentPatientId ? (
              <GaelOVisitSummary
                patientId={currentPatientId}
                existingVisits={visitsOfPatient ?? []}
                studyMainDicomTag={studyMainDicomTag}
                onVisitIdChange={onVisitIdChange}
              />
            ) : (
              <div>
                <p className="text-dark dark:text-white">Please select a patient first.</p>
              </div>
            )
            }
          </div>
        </div>
      }
    </div>
  );
};

export default GaelOVisitSelector;
