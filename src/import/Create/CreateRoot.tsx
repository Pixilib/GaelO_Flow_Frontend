import React, { useState, useEffect } from 'react';
import CreateDrop from './CreateDrop';
import CreateTableStudy from './CreateTableStudy';
import { SelectInput } from '../../ui';
import Model from '../../model/Model';
import CreateInput from './CreateInput';
import { Label } from '../../utils/types';

const CreateRoot: React.FC = () => {
    const [refModel, setRefModel] = useState<Model | null>(null);
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [showSeries, setShowSeries] = useState(false);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const studiesPerPage = 10;

    const handleFilesUploaded = (files: File[], model: Model) => {
        setRefModel(model);
        setStudiesData(model.getStudies());
    };

    const handleStudyClick = (studyInstanceUID: string) => {
        setCurrentStudyInstanceUID(studyInstanceUID);
        setShowSeries(true);
        updateSeriesData(studyInstanceUID);
    };

    const updateSeriesData = (studyInstanceUID: string) => {
        if (refModel) {
            setSeriesData(refModel.getStudy(studyInstanceUID).getAllSeries());
        }
    };

    useEffect(() => {
        if (currentStudyInstanceUID && refModel) {
            updateSeriesData(currentStudyInstanceUID);
        }
    }, [currentStudyInstanceUID, refModel]);

    const paginateStudies = (data: any[]) => {
        const startIndex = (page - 1) * studiesPerPage;
        return data.slice(startIndex, startIndex + studiesPerPage);
    };

    const handleSelectChange = (selectedOption: any) => {
        // Handle select change
    };

    const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <CreateDrop onFilesUploaded={handleFilesUploaded} />
            <div className="w-full mt-4">
                <label htmlFor="select-input" className="block mb-2 text-sm font-medium text-gray-700">New tag</label>
                <CreateInput onCreateLabel={function (payload: Label): void {
                    throw new Error('Function not implemented.');
                } }                />
            </div>
            {studiesData.length > 0 && (
                <div className="flex flex-col w-full mt-4 md:flex-row">
                    <div className="w-full">
                        <CreateTableStudy
                            data={paginateStudies(studiesData)}
                            studyInstanceUID={currentStudyInstanceUID}
                            onStudyClick={handleStudyClick}
                        />
                        {studiesData.length > studiesPerPage && (
                            <div className="flex justify-center mt-4">
                                <button
                                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next Page
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateRoot;
