import { useContext, useEffect, useMemo, useState } from "react";
import { getGaelOPatientLink, getVisitsTree } from "../../services/gaelo";
import { Colors, useCustomQuery, useCustomToast } from "../../utils";
import GaelOContext from "./context/GaelOContext";
import { Button, Label, Spinner } from "../../ui";
import PatientTable from "./patients/PatientTable";
import GaelOVisitSummary from "./GaelOVisitSummary";
import { GaeloIcon } from "../../assets";
import { exportResourcesId } from "../../services/export";
import { PatientDicomComparison } from "./dicoms/PatientDicomComparison";

type GaelOVisitSelectorProps = {
  studyOrthancId: string;
};

const GaelOVisitSelector = ({ studyOrthancId }: GaelOVisitSelectorProps) => {
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
  }, [selectedPatientId]);

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
      <Label className="font-bold" value="Patients :" />
      <PatientTable
        patients={patients}
        selectedPatientId={selectedPatientId}
        onRowClick={handlePatientClick}
      />

      {
        <>
          <Label className="font-bold" value="Dicom compliance :" />
          <PatientDicomComparison
            studyOrthancId={studyOrthancId}
            patientId={selectedPatientId}
          />
          <Label className="font-bold" value="Visits :" />
          <GaelOVisitSummary
            patientId={selectedPatientId}
            existingVisits={visitsOfPatient ?? []}
          />
        </>

      }
      <Button
        onClick={handleOpenGaelO}
        className="flex align-center gap-1"
        disabled={selectedPatientId == null}
        color={Colors.success}
      >
        Download Dicoms & Open <GaeloIcon />
      </Button>
    </div>
  );
};

export default GaelOVisitSelector;
