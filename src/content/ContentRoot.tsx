import React, { useEffect, useMemo, useState } from "react";
import { getLabels, findTools, useConfirm, deletePatient, getLabelsByRoleName } from "../services";
import {
  QueryPayload,
  useCustomMutation,
  useCustomQuery,
  useCustomToast,
  Study as StudyType,
} from "../utils";
import Model from "../model/Model";
import Patient from "../model/Patient";
import { FormCard, Button, CheckBox } from "../ui";
import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patients/AccordionPatient";
import EditPatient from "./patients/EditPatient";
import {
  addStudyIdToDeleteList,
  addSeriesOfStudyIdToExportList,
  addStudyIdToAnonymizeList,
} from "../utils/actionsUtils";
import { Colors } from "../utils";
import { Anon, Export, Trash } from "../icons";
import Labels from "./Labels";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import { postCdBurnerJob } from "../services/cd-burner";
import  ContentTour from "../tour/tours/ContentTour";

const ContentRoot: React.FC = () => {
  const { confirm } = useConfirm();
  const { toastSuccess, toastError } = useCustomToast();
  const { t } = useTranslation()

  const roleName = useSelector(
    (state: RootState) => state.user?.role?.name || ""
  );

  const role = useSelector((state: RootState) => state.user.role);

  const [selectedStudies, setSelectedStudies] = useState<{
    [patientId: string]: { [studyId: string]: boolean };
  }>({});

  const [model, setModel] = useState<Model | null>(null);
  const [queryPayload, setQueryPayload] = useState<QueryPayload | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const patients = useMemo(() => model?.getPatients() || [], [model]);

  const selectedStudiesIds = useMemo(() => {
    const studiesState = Object.values(selectedStudies).reduce(
      (a, v) => ({ ...a, ...v }),
      {}
    );
    const selectedIds = Object.entries(studiesState)
      .filter(([id, status]) => status === true)
      .map(([id, status]) => id);
    return selectedIds;
  }, [selectedStudies]);

  const handleDeletePatient = async (patient: Patient) => {
    const confirmContent = (
      <div className="italic">
        Are you sure you want to delete this patient:
        <span className="text-xl not-italic font-bold text-primary">
          {`${patient.patientId} ${patient.patientName}`}?
        </span>
      </div>
    );
    if (await confirm({ content: confirmContent })) {
      mutateDeletePatient(patient.id);
    }
  };

  const handleBurnerPatient = async (patient: Patient) => {
    const data = [
      { key: 'Patient Name', value: patient.patientName }
    ]

    const confirmContent = (
      <div>
        <span className="text-xl not-italic font-bold">
          {t("contents.burn-patient-confirmation")}
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
      postCdBurnerJob(patient.id, "Patient").then(() => {
        toastSuccess("CD Burner job created");
      }).catch((e) => {
        toastError(`Failed to create CD Burner job: ${e.statusText}`);
      });
    }
  }

  const closeEditModal = () => setEditingPatient(null);

  const handlePatientUpdate = () => {
    closeEditModal();
    refreshFind();
  };

  const { mutateAsync: mutateDeletePatient } = useCustomMutation<void, string>(
    (patientId) => deletePatient(patientId),
    [["jobs"]],
    {
      onSuccess: () => {
        toastSuccess("Patient deleted successfully");
        refreshFind();
      },
      onError: (error) => toastError(`Failed to delete patient: ${error}`),
    }
  );

  const { data: labelsData } = useCustomQuery<string[], string[]>(
    ["roles", roleName, "labels"],
    () => getLabelsByRoleName(roleName)
  );

  const { mutateAsync: mutateToolsFind, isPending } = useCustomMutation<
    StudyType[],
    QueryPayload
  >(findTools, [], {
    onSuccess: (data) => {
      const newModel = new Model();
      data.forEach((studyData) => newModel.addStudy(studyData));
      setModel(newModel);
    },
    onError: (error) => toastError(`Failed to load data: ${error}`),
  });

  const handleSubmit = async (formData: QueryPayload) => {
    setQueryPayload(formData);
    mutateToolsFind(formData);
  };

  const handlePatientSelectionChange = (
    selected: boolean,
    patient: Patient
  ) => {
    const studies = patient.getStudies().map((study) => study.id);
    const currentPatientState = selectedStudies?.[patient.id] ?? {};

    if (selected) {
      studies.forEach((studyId) => {
        currentPatientState[studyId] = true;
      });
    } else {
      studies.forEach((studyId) => {
        currentPatientState[studyId] = false;
      });
    }
    setSelectedStudies((state) => ({
      ...state,
      [patient.id]: currentPatientState,
    }));
  };

  const handleStudySelectedChange = (patient: Patient, changeObject) => {
    setSelectedStudies((state) => ({ ...state, [patient.id]: changeObject }));
  };

  const refreshFind = () => queryPayload && mutateToolsFind(queryPayload);

  const handleSendAnonymizeList = async () => {
    for (const studyId of selectedStudiesIds) {
      await addStudyIdToAnonymizeList(studyId);
    }
  };

  const handleSendExportList = async () => {
    for (const studyId of selectedStudiesIds) {
      await addSeriesOfStudyIdToExportList(studyId);
    }
  };

  const handleSendDeleteList = async () => {
    for (const studyId of selectedStudiesIds) {
      await addStudyIdToDeleteList(studyId);
    }
  };

  useEffect(() => {
    if (!model) return;
    const studies = model.getStudies();
    const newSelectedState = {};
    if (selectAll) {
      studies.forEach((study) => {
        if (!newSelectedState[study.patientId]) {
          newSelectedState[study.patientId] = {};
        }
        newSelectedState[study.patientId] = {
          ...newSelectedState[study.patientId],
          [study.id]: true,
        };
      });
    }
    setSelectedStudies(newSelectedState);
  }, [selectAll])

  return (
    <>
    <div className="w-full flex justify-end m-1">
      <ContentTour />
    </div>
    <div className="flex flex-col gap-3">
      <EditPatient
        key={editingPatient?.id ?? undefined}
        patient={editingPatient as Patient}
        onEditPatient={handlePatientUpdate}
        onClose={closeEditModal}
        show={!!editingPatient}
      />
      <div data-gaelo-flow="content-form">
      <FormCard
        className="bg-white dark:bg-neutral-500"
        title={t("query.search")}
        collapsible
      >
        <SearchForm
          onSubmit={handleSubmit}
          existingLabels={labelsData}
          withAets={false}
        />
      </FormCard>
      </div>
      <div className="flex flex-col w-full p-4 bg-white shadow-md dark:bg-neutral-800 rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary dark:text-white">
            {t("query.results")}
          </div>
          <div className="text-lg text-gray-600 dark:text-white">
            {patients.length} {patients.length === 1 ? "patient" : "patients"}{" "}
            found
          </div>
        </div>

        <div className="w-full mb-3 border-t border-gray-200" />

        <div data-gaelo-flow="content-buttons" className="flex flex-wrap gap-2 mb-4">
          <CheckBox
            bordered={false}
            type="checkbox"
            checked={selectAll}
            onChange={(event) => setSelectAll(event.target.checked)}
          />
          {role.anonymize &&
            <Button
              color={Colors.blueCustom}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendAnonymizeList}
            >
              <Anon className="text-xl" />
              <span className="ml-2">{t("buttons.send-to-anonymize")}</span>
            </Button>
          }
          {role.export &&
            <Button
              color={Colors.secondary}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendExportList}
            >
              <Export className="text-xl" />
              <span className="ml-2">{t("buttons.send-to-export")}</span>
            </Button>
          }
          {role.delete &&
            <Button
              color={Colors.danger}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendDeleteList}
            >
              <Trash className="text-xl" />
              <span className="ml-2">{t("buttons.send-to-delete")}</span>
            </Button>
          }
          <Labels selectedStudyIds={selectedStudiesIds} />
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        {patients.length > 0
          ? patients.map((patient) => (
            <AccordionPatient
              key={patient.id}
              patient={patient}
              onPatientSelectionChange={handlePatientSelectionChange}
              onBurnerPatient={handleBurnerPatient}
              onDeletePatient={handleDeletePatient}
              onEditPatient={setEditingPatient}
              onStudyUpdated={refreshFind}
              selectedStudies={selectedStudies}
              onSelectedStudyChange={handleStudySelectedChange}
            />
          ))
          : null}
      </div>
    </div>
  </>
  );
};

export default ContentRoot;
