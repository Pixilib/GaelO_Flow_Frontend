import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  CheckBox,
  DeleteButton,
  DownloadButton,
  EditButton,
} from "../../ui";
import Patient from "../../model/Patient";
import StudyRoot from "../studies/StudyRoot";
import SeriesRoot from "../series/SeriesRoot";
import { AccordionHeader } from "../../ui/Accordion";
import { exportRessource } from "../../services/export";
import { useCustomToast } from "../../utils";
import ToggleChevron from "../../ui/menu/ToogleChevron";

type AccordionPatientProps = {
  patient: Patient;
  onPatientSelectionChange: (selected: boolean, patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
  onStudyUpdated: (patient: Patient) => void;
  onDeletePatient: (patient: Patient) => void;
  selectedStudies: { [patientId: string]: { [studyId: string]: boolean } };
  onSelectedStudyChange: (
    patient: Patient,
    selectedState: { [studyId: string]: boolean }
  ) => void;
};

const AccordionPatient = ({
  patient,
  onPatientSelectionChange,
  onEditPatient,
  onDeletePatient,
  onStudyUpdated,
  selectedStudies,
  onSelectedStudyChange,
}: AccordionPatientProps) => {
  const { toastSuccess, updateExistingToast } = useCustomToast();
  const [currentActiveStudyId, setCurrentStudyId] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectedStudyIdsForPatient = useMemo(() => {
    return selectedStudies[patient.id];
  }, [JSON.stringify(selectedStudies)]);

  const isSelectedPatient = useMemo(()=>{
    if(!selectedStudyIdsForPatient || Object.keys(selectedStudyIdsForPatient).length === 0 ) return false

    console.log(selectedStudyIdsForPatient)
    return Object.entries(selectedStudyIdsForPatient).every(([_id, selected]) => selected === true )
  }, [JSON.stringify(selectedStudyIdsForPatient)])

  const handleSelectionPatientChange = (event) => {
    onPatientSelectionChange(event.target.checked, patient);
  }

  const handleStudySelected = (studyId: string) => {
    setCurrentStudyId(studyId);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    event.stopPropagation();
    onEditPatient(patient);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    event.stopPropagation();
    onDeletePatient(patient);
  };

  const handleDownloadClick = (
    event: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    event.stopPropagation();
    const id = toastSuccess("Download started");
    exportRessource("patients", patient.id, (mb) =>
      updateExistingToast(id, "Downloaded " + mb + " mb")
    );
  };

  return (
    <Accordion
      header={
        <AccordionHeader
          className="hover:bg-primary-active group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CheckBox
            bordered={false}
            onClick={(event) => event.stopPropagation()}
            onChange={handleSelectionPatientChange}
            checked={isSelectedPatient}
          />
          <div className="grid items-center justify-between w-full grid-cols-4 ml-5 lg:gap-x-10 ">
            <span className="text-sm font-medium text-gray-600 group-hover:text-white dark:text-white">
              Patient ID: {patient.patientId}
            </span>
            <span className="text-sm font-medium group-hover:text-white ">
              Name: {patient.patientName}
            </span>
            <span className="text-sm font-medium group-hover:text-white">
              Nb of Studies: {patient.getStudies().length}
            </span>
            <div className="flex justify-end w-full space-x-7">
              <EditButton
                onClick={handleEditClick}
                className="group-hover:fill-white"
              />
              <DownloadButton onClick={handleDownloadClick} />
              <DeleteButton onClick={handleDeleteClick} />
            </div>
          </div>
          <ToggleChevron
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className=""
          />
        </AccordionHeader>
      }
      className="w-full rounded-2xl"
    >
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`${!currentActiveStudyId ? "lg:col-span-2" : ""}`}>
          <StudyRoot
            patient={patient}
            onStudyUpdated={() => onStudyUpdated(patient)}
            onStudySelected={handleStudySelected}
            selectedStudies={selectedStudyIdsForPatient}
            currentActiveStudyId={currentActiveStudyId}
            onSelectedStudyChange={(selectedState) =>
              onSelectedStudyChange(patient, selectedState)
            }
          />
        </div>
        {currentActiveStudyId && (
          <div>
            <SeriesRoot studyId={currentActiveStudyId} />
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default AccordionPatient;
