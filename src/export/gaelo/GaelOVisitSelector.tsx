import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Label, Spinner } from "../../ui";

import { Colors, useCustomQuery, useCustomToast } from "../../utils";
import { GaeloIcon } from "../../assets";
import { exportResourcesId } from "../../services/export";
import { getGaelOPatientLink, getVisitsTree } from "../../services/gaelo";

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

  const handleOpenGaelO = () => {
    const id = toastSuccess("Download started");
    exportResourcesId(
      [studyOrthancId],
      (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"),
      undefined,
      true,
      undefined,
      'GaelO-' + studyName + '-' + selectedPatientId + '.zip'
    );
    window.open(
      getGaelOPatientLink(studyName, role, selectedPatientId, token, userId),
      "_blank"
    );
  };

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-dark text-l" >Patients :</h1>
      <PatientTable
        patients={patients}
        selectedPatientId={selectedPatientId}
        onRowClick={handlePatientClick}
      />

      {
        <>
          <h1 className="font-bold text-dark text-l" >Dicom compliance :</h1>
          <PatientDicomComparison
            studyOrthancId={studyOrthancId}
            patientId={selectedPatientId}
          />
          <h1 className="font-bold text-dark text-l" >Visits :</h1>
          <GaelOVisitSummary
            studyOrthancId={studyOrthancId}
            patientId={selectedPatientId}
            existingVisits={visitsOfPatient ?? []}
            studyMainDicomTag={studyMainDicomTag}
          />
        </>

      }
      {/* <Button
        onClick={handleOpenGaelO}
        className="flex align-center gap-1"
        disabled={selectedPatientId == null}
        color={Colors.success}
      >
        Download Dicoms & Open <GaeloIcon />
      </Button> */}
    </div>
  );
};

export default GaelOVisitSelector;
