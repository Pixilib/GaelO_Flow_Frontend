import React, { useState, useRef } from 'react';
import { BannerAlert, CardFooter } from '../../ui';
import Model from '../../model/Model';
import { Colors } from '../../utils';
import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import ImportErrorModal from './ImportErrorModal';

interface ImportError {
    filename: string;
    errorMessage: string;
}

const ImportRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [errors, setErrors] = useState<ImportError[]>([]);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleFilesUploaded = () => {
        setStudiesData(refModel.current.getStudies());
    };

    const handleStudyClick = (studyInstanceUID: string) => {
        setCurrentStudyInstanceUID(studyInstanceUID);
        updateSeriesData(studyInstanceUID);
    };

    const updateSeriesData = (studyInstanceUID: string) => {
        const study = refModel.current.getStudy(studyInstanceUID);
        if (study) {
            setSeriesData(study.getAllseries());
        }
    };

    const handleImportError = (filename: string, errorMessage: string) => {
        setErrors((prevErrors) => [...prevErrors, { filename, errorMessage }]);
    };

    const handleShowModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <div className='mx-6 mt-6 mb-4'>
                <ImportDrop
                    model={refModel.current}
                    onError={handleImportError}
                    onFilesUploaded={handleFilesUploaded}
                />
            </div>

            {errors.length > 0 && (
                <BannerAlert
                    color={Colors.red}
                    message={`Error Importing ${errors.length} file(s)`}
                    onClickButton={handleShowModal}
                    buttonLabel="See Errors"
                />
            )}

            {showErrorModal && (
                <ImportErrorModal
                    errors={errors}
                    onClose={handleCloseModal}
                />
            )}

            <div className="flex flex-col gap-3 lg:flex-row">
                <div className='flex-1'>
                    {studiesData.length > 0 && (
                        <ImportTableStudy
                            data={studiesData}
                            selectedStudyInstanceUID={currentStudyInstanceUID}
                            onStudyClick={handleStudyClick}
                        />
                    )}
                </div>
                <div className='flex-1'>
                    {seriesData.length > 0 && (
                        <ImportTableSeries data={seriesData} />
                    )}
                </div>
            </div>

            <CardFooter className="flex justify-center w-full h-16 bg-almonde">
            </CardFooter>
        </>
    );
};

export default ImportRoot;
