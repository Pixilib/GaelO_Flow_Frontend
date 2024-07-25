import React, { useState, useEffect, useRef } from 'react';
import { CardFooter, Button } from '../../ui';
import { FaPlus as AddIcon } from 'react-icons/fa';

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
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [tags, setTags] = useState<{ TagName: string, Value: string }[]>([]);

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
            <div className='mx-6 mt-6 smb-4'>
                <CreateDrop onDrop={handleFilesUploaded} />
            </div>

            <div className="w-full mt-4 space-y-3 md:flex md:space-x-3">
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

            {tags.length > 0 && (
                <div className="mx-6 mt-4">
                    <TagTable
                        data={tags}
                        onDataUpdate={handleTagUpdate}
                        onDeleteTag={handleTagDelete}
                    />
                </div>
            )}

<CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
    {showCreateForm ? (
        <CreateForm
            onClose={handleCloseForm}
            title="Create Dicom"
            onAddTag={handleAddTag}
        />
    ) : (
        <Button
            color={Colors.success}
            onClick={handleCreateDicomClick}
            className="flex items-center space-x-2">
            <AddIcon />
            <span>Créer Tag</span>
        </Button>
    )}
</CardFooter>
        </>
    );
};

export default CreateRoot;
