import React, { useState, useRef, useCallback, useEffect } from "react";
import { BannerAlert } from "../../ui";
import Model from "../../model/Model";
import { Colors } from "../../utils";
import ImportDrop from "./ImportDrop";
import ImportTableStudy from "./ImportTableStudy"; // Import de ImportTableStudy
import ImportTableSeries from "./ImportTableSeries"; // Import de ImportTableSeries
import ImportErrorModal from "./ImportErrorModal";

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

  useEffect(() => {
    if (currentStudyInstanceUID) {
      updateSeriesData(currentStudyInstanceUID);
    }
  }, [currentStudyInstanceUID]);

  return (
    <div className="mx-4 mb-4 space-y-3"> {/* Ajout de mb-4 pour l'espace en bas */}
      <ImportDrop
        model={refModel.current}
        onError={handleImportError}
        onFilesUploaded={() => refreshStudyData()}
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
        <div className="flex gap-4">
          <div className="flex-1 mb-4 overflow-x-auto shadow-lg rounded-xl">
            <ImportTableStudy
              data={studiesData}
              selectedStudyInstanceUID={currentStudyInstanceUID}
              onStudyClick={handleStudyClick}
            />
          </div>

          {currentStudyInstanceUID && seriesData.length > 0 && (
            <div className="flex-1 overflow-x-auto shadow-lg rounded-xl mb">
              <ImportTableSeries data={seriesData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportRoot;
