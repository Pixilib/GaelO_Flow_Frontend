import React, { useState, useEffect } from 'react';
import ImportDrop from './ImportDrop';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';
import Model from '../../model/Model';

const ImportRoot: React.FC = () => {
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
            setSeriesData(refModel.getStudy(studyInstanceUID).getAllseries());
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

    return (
        <div className="flex flex-col items-center">
            <ImportDrop onFilesUploaded={handleFilesUploaded} />
            {studiesData.length > 0 && (
                <div className="flex flex-col w-full mt-8 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <ImportTableStudy
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
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                    {showSeries && seriesData.length > 0 && (
                        <div className="w-full mt-4 md:w-1/2 md:ml-4 md:mt-0">
                            <ImportTableSeries data={seriesData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImportRoot;
