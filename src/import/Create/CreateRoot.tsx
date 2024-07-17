import React, { useState, useEffect, useRef } from 'react';
import CreateDrop from './CreateDrop';
import Model from '../../model/Model';
import CreateTableSeries from './CreateTableSeries.tsx';
import CreateTableStudy from './CreateTableStudy.tsx';

const CreateRoot: React.FC = () => {
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
            <CreateDrop model={refModel.current} onFilesUploaded={handleFilesUploaded} />
            <div className="space-y-3 md:flex md:space-x-3">
                <div className="md:w-1/2 md:flex-1">
                    {studiesData.length > 0 && (
                        <CreateTableStudy
                            data={studiesData}
                            selectedStudyInstanceUID={currentStudyInstanceUID}
                            onStudyClick={handleStudyClick}
                        />
                    )}
                </div>
                <div className="md:w-1/2 md:flex-1">
                    {seriesData.length > 0 && (
                        <CreateTableSeries data={seriesData} />
                    )}
                </div>
            </div>
        </div>
    );
};
export default CreateRoot;
