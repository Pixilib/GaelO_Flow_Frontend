import React, { useState, useRef } from 'react';
import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import Model from '../../model/Model';
import BannerAlert from '../../ui/BannerAlert';
import ImportErrorModal from './ImportErrorModal';t

const ImportRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleFilesUploaded = () => {
        setStudiesData(refModel.current.getStudies());
    };

    const handleStudyClick = (studyInstanceUID: string) => {
        setCurrentStudyInstanceUID(studyInstanceUID);
        updateSeriesData(studyInstanceUID);
    };

    const updateSeriesData = (studyInstanceUID: string) => {
        setSeriesData(refModel.current.getStudy(studyInstanceUID).getAllseries());
    };

    const handleImportError = (errorMessage: string) => {
        setErrors((prevErrors) => [...prevErrors, errorMessage]);
    };

    const handleShowModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <div className='space-y-3'>
            <ImportDrop
                model={refModel.current}
                onError={handleImportError}
                onFilesUploaded={handleFilesUploaded}
            />
            {errors.length > 0 && (
                <BannerAlert
                    color="red"
                    message={`Erreur d'importation de ${errors.length} fichier(s)`}
                    onClickButton={handleShowModal}
                />
            )}
            <div className="space-y-3 md:flex md:space-x-3">
                <div className="md:w-1/2 md:flex-1">
                    {studiesData.length > 0 && (
                        <ImportTableStudy
                            data={studiesData}
                            selectedStudyInstanceUID={currentStudyInstanceUID}
                            onStudyClick={handleStudyClick}
                        />
                    )}
                </div>
                <div className="md:w-1/2 md:flex-1">
                    {seriesData.length > 0 && (
                        <ImportTableSeries data={seriesData} />
                    )}
                </div>
            </div>
            {showErrorModal && (
                <ImportErrorModal
                    errors={errors}
                    onClose={handleCloseModal}
                    onClearErrors={clearErrors}
                />
            )}
        </div>
    );
};

export default ImportRoot;
