import React, { useState, useRef, useCallback, useEffect } from "react";
import { BannerAlert, Button } from "../../ui";
import Model from "../../model/Model";
import { Colors } from "../../utils";
import ImportDrop from "./ImportDrop";
import ImportTableStudy from "./ImportTableStudy";
import ImportTableSeries from "./ImportTableSeries";
import ImportErrorModal from "./ImportErrorModal";
import { Anon, Export, Trash } from "../../icons";
import {
  addStudyIdToDeleteList,
  addSeriesOfStudyIdToExportList,
  addStudyIdToAnonymizeList,
} from "../../utils/actionsUtils";
import SelectRoleLabels from "../../datasets/SelectRoleLabels";

interface ImportError {
  filename: string;
  errorMessage: string;
}

const ImportRoot: React.FC = () => {
  const refModel = useRef<Model>(new Model());
  const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<
    string | null
  >(null);
  const [studiesData, setStudiesData] = useState<any[]>([]);
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, boolean>>({});
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const refreshStudyData = () => {
    const studies = refModel.current.getStudies();
    setStudiesData(studies);
  };

  const handleStudyClick = useCallback((studyInstanceUID: string) => {
    refreshStudyData();
    setCurrentStudyInstanceUID(studyInstanceUID);
    updateSeriesData(studyInstanceUID);
  }, []);

  const updateSeriesData = (studyInstanceUID: string) => {
    const study = refModel.current.getStudy(studyInstanceUID);
    if (study) {
      setSeriesData(study.getAllseries());
    }
  };

  const handleImportError = useCallback(
    (filename: string, errorMessage: string) => {
      setErrors((prevErrors) => [...prevErrors, { filename, errorMessage }]);
    },
    []
  );

  const handleShowModal = useCallback(() => {
    setShowErrorModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowErrorModal(false);
  }, []);

  const onRowSelectionChange = useCallback(
    (selectedRow: Record<string, boolean>) => {
      setSelectedRow(selectedRow);
    },
    []
  );

  const handleSendAnonymizeList = () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addStudyIdToAnonymizeList(key);
      });
  };

  const handleSendExportList = async () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addSeriesOfStudyIdToExportList(key);
      });
  };

  const handleSendDeleteList = async () => {
    Object.entries(selectedRow)
      .filter(([_, value]) => value)
      .forEach(async ([key]) => {
        await addStudyIdToDeleteList(key);
      });
  };

  useEffect(() => {
    if (currentStudyInstanceUID) {
      updateSeriesData(currentStudyInstanceUID);
    }
  }, [currentStudyInstanceUID]);

  return (
    <div className="mx-4 mb-4 mt-4 space-y-3 flex flex-col items-center">
      <SelectRoleLabels
        values={selectedLabels}
        onChange={setSelectedLabels}
      />
      <ImportDrop
        model={refModel.current}
        onError={handleImportError}
        onFilesUploaded={() => refreshStudyData()}
        selectedLabel={selectedLabels}
      />
      {errors.length > 0 && (
        <BannerAlert
          color={Colors.danger}
          message={`Error Importing ${errors.length} file(s)`}
          onClickButton={handleShowModal}
          buttonLabel="See Errors"
        />
      )}

      {showErrorModal && (
        <ImportErrorModal errors={errors} onClose={handleCloseModal} />
      )}

      {studiesData.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-2">
            <Button
              color={Colors.blueCustom}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendAnonymizeList}
            >
              <Anon className="text-xl" />
              <span className="ml-2">Send to Anonymize</span>
            </Button>

            <Button
              color={Colors.secondary}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendExportList}
            >
              <Export className="text-xl" />
              <span className="ml-2">Send to Export</span>
            </Button>

            <Button
              color={Colors.danger}
              className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
              onClick={handleSendDeleteList}
            >
              <Trash className="text-xl" />
              <span className="ml-2">Send to Delete</span>
            </Button>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 mb-4 overflow-x-auto shadow-lg rounded-xl">
              <ImportTableStudy
                data={studiesData}
                selectedStudyInstanceUID={currentStudyInstanceUID}
                onStudyClick={handleStudyClick}
                selectedRow={selectedRow}
                onRowSelectionChange={onRowSelectionChange}
              />
            </div>
            {currentStudyInstanceUID && seriesData.length > 0 && (
              <div className="flex-1 overflow-x-auto shadow-lg rounded-xl mb">
                <ImportTableSeries data={seriesData} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportRoot;
