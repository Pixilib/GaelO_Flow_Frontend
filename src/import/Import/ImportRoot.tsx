import React, { useState, useRef } from 'react';
import { BannerAlert } from '../../ui';

import Model from '../../model/Model';
import { Colors } from '../../utils';

import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import ImportErrorModal from './ImportErrorModal';

const ImportRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ [filename: string]: string }[]>([]);
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

    const handleImportError = (filename: string, errorMessage: string) => {
        setErrors((prevErrors) => [...prevErrors, { filename, errorMessage }]);
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
        <div className='flex flex-col gap-3'>
            <ImportDrop
                model={refModel.current}
                onError={handleImportError}
                onFilesUploaded={handleFilesUploaded}
            />
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
            <div className="flex lg:max-xl:flex-col gap-3">
                <div className='flex align-middle'>
                    {studiesData.length > 0 && (
                        <ImportTableStudy
                            data={studiesData}
                            selectedStudyInstanceUID={currentStudyInstanceUID}
                            onStudyClick={handleStudyClick}
                        />
                    )}
                </div>
                <div>
                    {seriesData.length > 0 && (
                        <ImportTableSeries data={seriesData} />
                    )}
                </div>
            </div>

        </div>
    );
};

export default ImportRoot;
