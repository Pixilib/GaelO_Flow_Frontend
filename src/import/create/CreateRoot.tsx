import React, { useState, useEffect, useRef } from 'react';

import { Button } from '../../ui';
import Model from '../../model/Model';
import CreateTableSeries from './CreateTableSeries';
import CreateTableStudy from './CreateTableStudy';
import CreateForm from './CreateForm';
import CreateDrop from './CreateDrop';
import TagTable from './TagTable';
import { Colors } from '../../utils';

const CreateRoot: React.FC = () => {
    const refModel = useRef<Model>(new Model());
    const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<string | null>(null);
    const [studiesData, setStudiesData] = useState<any[]>([]);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [tags, setTags] = useState<{ TagName: string, Value: string }[]>([]);


    const handleFilesUploaded = () => setStudiesData(refModel.current.getStudies());

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

    const handleAddTag = (tag: { TagName: string, Value: string }) => {
        setTags(prevTags => [...prevTags, tag]);
    };

    const handleTagUpdate = (tagName: string, columnId: string, value: string) => {
        setTags(prevTags =>
            prevTags.map(tag =>
                tag.TagName === tagName ? { ...tag, [columnId]: value } : tag
            )
        );
    };

    const handleTagDelete = (tagName: string) => {
        setTags(prevTags => prevTags.filter(tag => tag.TagName !== tagName));
    };

    return (
        <>
            <div className='p-6'>
                <CreateDrop onDrop={handleFilesUploaded} />
            </div>

            <div className="w-full space-y-3 md:flex md:space-x-3">
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

            <div className="flex flex-col justify-center border-indigo-100 shadow-inner p-3 bg-light">
                <TagTable
                    data={tags}
                    onDataUpdate={handleTagUpdate}
                    onDeleteTag={handleTagDelete}
                />
                <CreateForm
                    title="Define DICOM Tags"
                    onAddTag={handleAddTag}
                />


            </div>
            <div className="flex bg-white justify-center p-3">
                <Button
                    color={tags.length > 0 ? Colors.primary : Colors.almond}
                >
                    Create Dicom
                </Button>
            </div>
        </>
    );
};

export default CreateRoot;
