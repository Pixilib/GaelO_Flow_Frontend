import Card, { CardHeader, CardBody } from "../ui/Card";
import {
  Colors,
  useCustomMutation,
  useCustomQuery,
  useCustomToast,
} from "../utils";
import { Button } from "../ui";
import SelectRoleLabels from "./SelectRoleLabels";
import { findTools } from "../services";
import Model from "../model/Model";
import { useEffect, useState } from "react";
import { FindPayload, Series } from "../utils/types";
import { getSeriesOfStudy } from "../services/orthanc";
import DatasetStudyRoot from "./studies/DatasetStudyRoot";
import DatasetSeriesRoot from "./series/DatasetSeriesRoot";
import { Anon, Export, Trash } from "../icons";
import { addSeriesOfStudyIdToExportList, addStudyIdToAnonymizeList, addStudyIdToDeleteList } from "../utils/actionsUtils";
import { useTranslation } from "react-i18next";

const DatasetRoot = () => {
  const [model, setModel] = useState<Model | null>(null);

  const [currentStudyId, setCurrentStudyId] = useState<string | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<Record<string, boolean>>({});
  const {t} = useTranslation()


  const { toastError } = useCustomToast();
  const studies =
    model
      ?.getPatients()
      .map((patient) => patient.getStudies())
      .flat() ?? [];

  const { data: series, refetch } = useCustomQuery<Series[]>(
    ["series", currentStudyId as string],
    () =>
      currentStudyId
        ? getSeriesOfStudy(currentStudyId as string)
        : new Promise((success, reject) => success([])),
    {
      onError: (error) => {
        console.error(
          `No series for this study or an error occurred: ${error}`
        );
      },
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [currentStudyId]);

  const { mutateAsync: mutateToolsFind } = useCustomMutation(
    ({ queryPayload }) => findTools(queryPayload),
    [],
    {
      onSuccess: (data) => {
        const newModel = new Model();
        data.forEach((studyData) => newModel.addStudy(studyData));
        setModel(newModel);
      },
      onError: (error: any) => {
        toastError("Failed to load data: " + error);
      },
    }
  );

  useEffect(() => {
    if (selectedLabels.length === 0) {
      setModel(new Model());
      setCurrentStudyId(null);
      return;
    }
    doFind();
  }, [selectedLabels]);

  const doFind = () => {
    const queryPayload: FindPayload = {
      Level: "Study",
      Labels: selectedLabels,
      LabelsConstraint: "Any",
      Query: {},
    };
    mutateToolsFind({ queryPayload });
  };

  const handleStudyRowClick = (studyId: string) => {
    setCurrentStudyId(studyId);
  };

  const handleStudyUpdated = () => {
    doFind();
  };

  const handleOnSeriesEdited = () => {
    refetch()
  }

  const onRowSelectionChange = (selectedRow: Record<string, boolean>) => {
    setSelectedRow(selectedRow);
  }

  const handleSendAnonymizeList = () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addStudyIdToAnonymizeList(key);
      });
  }
  const handleSendExportList = () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addSeriesOfStudyIdToExportList(key);
      });
  }
  const handleSendDeleteList = () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addStudyIdToDeleteList(key);
      });
  }

  return (
    <Card>
      <CardHeader centerTitle color={Colors.primary} title="Dataset" />
      <CardBody className="bg-almond dark:bg-neutral-500 flex flex-col gap-4">
        <div>
          <span className="text-base font-semibold text-gray-700 dark:text-white">
            Labels
          </span>
          <SelectRoleLabels
            values={selectedLabels}
            onChange={(labels) => setSelectedLabels(labels)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            color={Colors.blueCustom}
            className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
            onClick={handleSendAnonymizeList}
          >
            <Anon className="text-xl" />
            <span className="ml-2">{t("buttons.Send to Anonymize")}</span>
          </Button>

          <Button
            color={Colors.secondary}
            className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
            onClick={handleSendExportList}
          >
            <Export className="text-xl" />
            <span className="ml-2">{t("buttons.Send to Export")}</span>
          </Button>

          <Button
            color={Colors.danger}
            className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
            onClick={handleSendDeleteList}
          >
            <Trash className="text-xl" />
            <span className="ml-2">{t("buttons.Send to Delete")}</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-12">
          <div className="2xl:col-span-7">
            <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700 dark:text-white">
              Studies
            </span>
            <DatasetStudyRoot
              studies={studies}
              onRowClick={handleStudyRowClick}
              selectedStudyId={currentStudyId}
              onStudyUpdated={handleStudyUpdated}
              onRowSelectionChange={onRowSelectionChange}
              selectedRow={selectedRow}
            />
          </div>
          <div className="2xl:col-span-5">
            <span className="mx-4 mt-2 mb-4 text-base font-semibold text-gray-700 dark:text-white">
              Series
            </span>
            {series && <DatasetSeriesRoot onSeriesEdited={handleOnSeriesEdited} series={series} />}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DatasetRoot;
