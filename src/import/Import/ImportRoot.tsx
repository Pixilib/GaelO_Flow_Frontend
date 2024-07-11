import React, { useState, useEffect, useRef } from 'react';
import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import Model from '../../model/Model';

const ImportRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());

    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);

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

    useEffect(() => {
        if (currentStudyInstanceUID) {
            updateSeriesData(currentStudyInstanceUID);
        }
    }, [currentStudyInstanceUID]);

    return (
        <div className='space-y-3'>
            <ImportDrop model={refModel.current} onFilesUploaded={handleFilesUploaded} />
            <div className="space-y-3">
                {studiesData.length > 0 && (
                    <ImportTableStudy
                        data={studiesData}
                        selectedStudyInstanceUID={currentStudyInstanceUID}
                        onStudyClick={handleStudyClick}
                    />
                )}
                {seriesData.length > 0 && (
                    <ImportTableSeries data={seriesData} />
                )}
            </div>
        </div>
    );
};

export default ImportRoot;
