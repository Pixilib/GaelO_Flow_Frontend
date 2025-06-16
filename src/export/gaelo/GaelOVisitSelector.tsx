import { useContext, useEffect, useMemo, useState } from "react";
import { Spinner } from "../../ui";

import { useCustomQuery, useCustomToast } from "../../utils";
import { getVisitsTree } from "../../services/gaelo";

import GaelOContext from "./context/GaelOContext";
import { PatientDicomComparison } from "./dicoms/PatientDicomComparison";
import PatientTable from "./patients/PatientTable";
import GaelOVisitSummary from "./GaelOVisitSummary";
import { StudyMainDicomTags } from "../../utils/types";

type GaelOVisitSelectorProps = {
  studyOrthancId: string;
  studyMainDicomTag: StudyMainDicomTags
};

const GaelOVisitSelector = ({ studyOrthancId, studyMainDicomTag }: GaelOVisitSelectorProps) => {
  const { studyName, token, role, userId } = useContext(GaelOContext);
  const { updateExistingToast, toastSuccess } = useCustomToast();

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  useEffect(() => {
    //Reset selected patient id on change study
    setSelectedPatientId(null);
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
    setSelectedPatientId(patientId);
  };

  const visitsOfPatient = useMemo(() => {
    if (!visitTree) return [];
    const visitsOfPatient = Object.values(visitTree.visits).filter(
      (visit: any) => visit.patientId === selectedPatientId
    );
    return visitsOfPatient;
  }, [selectedPatientId, visitTree]);

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-3">
      {studyName ? (
        <PatientTable
          patients={patients}
          selectedPatientId={selectedPatientId}
          onRowClick={handlePatientClick}
        />
      ) : (
        <div className="w-full">
          <p className="text-dark">Please select a study first.</p>
        </div>
      )}
      {studyName &&
        <div className="flex items-center w-full">
          <div className="w-full">
            <h1 className="font-bold text-dark text-l" >Visits :</h1>
            {selectedPatientId ? (
              <GaelOVisitSummary
                studyOrthancId={studyOrthancId}
                patientId={selectedPatientId}
                existingVisits={visitsOfPatient ?? []}
                studyMainDicomTag={studyMainDicomTag}
              />
            ) : (
              <div>
                <p className="text-dark">Please select a patient first.</p>
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
