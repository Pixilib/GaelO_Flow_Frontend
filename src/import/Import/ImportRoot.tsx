import React, { useState } from 'react';
import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import Model from '../../model/Model';

const ImportRoot: React.FC = () => {
    const refModel = new Model();
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [showSeries, setShowSeries] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFilesUploaded = (files: File[]) => {
        setUploadedFiles(files);
    };

    const handleStudyClick = (studyInstanceUID: string) => {
        setCurrentStudyInstanceUID(studyInstanceUID);
        setShowSeries(true);
    };

    const studiesData = refModel.getStudies();

    const seriesData = currentStudyInstanceUID ? refModel.getStudy(currentStudyInstanceUID).getAllseries() : [];

    return (
        <div className="flex flex-col items-center">
            <ImportDrop onFilesUploaded={handleFilesUploaded} />
            <div className="flex flex-col w-full mt-4 md:flex-row">
                <div className="w-full">
                    <ImportTableStudy
                        data={studiesData}
                        studyInstanceUID={currentStudyInstanceUID}
                        onStudyClick={handleStudyClick}
                    />
                </div>
                {showSeries && (
                    <div className="w-full mt-4 md:ml-10 md:mt-0">
                        <ImportTableSeries data={seriesData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImportRoot;
