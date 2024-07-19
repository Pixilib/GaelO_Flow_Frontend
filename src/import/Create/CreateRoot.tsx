import React, { useState, useEffect, useRef } from 'react';
import { CardFooter, Button } from '../../ui';

import CreateDrop from './CreateDrop';
import Model from '../../model/Model';
import CreateTableSeries from './CreateTableSeries.tsx';
import CreateTableStudy from './CreateTableStudy.tsx';
import { Colors } from '../../utils/enums.ts';
import CreateForm from './CreateForm.tsx';

const CreateRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());

    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateDicomClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
    };


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
            <CreateDrop onDrop={handleFilesUploaded} />
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

            {showCreateForm ?
                <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                    <CreateForm onClose={handleCloseForm} title={"Create Dicom"} />
                </CardFooter>
                :
                <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                    <Button
                        color={Colors.success}
                        onClick={handleCreateDicomClick}
                    >
                        Create Dicom
                    </Button>
                </CardFooter>
            }
        </div>
    );
};
export default CreateRoot;
