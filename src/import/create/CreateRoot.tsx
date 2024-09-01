import React, { useState } from 'react';

import { Button } from '../../ui';
import CreateForm from './CreateForm';
import CreateDrop from './CreateDrop';
import TagTable from './TagTable';
import { Colors, useCustomMutation, useCustomToast } from '../../utils';
import { createDicom } from '../../services/instances';

const CreateRoot: React.FC = () => {
    const { toastError, toastSuccess } = useCustomToast()
    const [tags, setTags] = useState<{ name: string, value: string }[]>([]);
    const [files, setFiles] = useState<File[]>([])

    const { mutate } = useCustomMutation(
        ({ content, tags }) => createDicom(content, tags),
        [[]],
        {
            onSuccess: () => {
                toastSuccess('Dicom series created')
            },
            onError: () => {
                toastError('Unable to create series')
            }
        }
    )


    const handleFilesUploaded = (files: File[]) => {
        setFiles(files)
    };

    const handleCreateDicoms = async () => {
        const content: string[] = []
        for (const file of files) {
            const dataURI = await readFileAsDataURL(file)
            content.push(dataURI)
        }
        const formattedtags = {}
        tags.forEach(tag => formattedtags[tag.name] = tag.value);
        mutate({ content: content, tags: formattedtags })
    }

    const handleAddTag = (tag: { name: string, value: string }) => {
        setTags(prevTags => [...prevTags, tag]);
    };

    const handleTagDelete = (name: string) => {
        setTags(prevTags => prevTags.filter(tag => tag.name !== name));
    };

    const readFileAsDataURL = (file: File) => {
        return new Promise<string>((resolve) => {
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result as string)
            }
        })
    }

    return (
        <>
            <div className="w-full space-y-3 md:flex md:space-x-3 p-6">
                <CreateDrop files={files} onDrop={handleFilesUploaded} />
            </div>

            <div className="flex flex-col justify-center border-indigo-100 shadow-inner p-3 bg-light">
                <TagTable
                    data={tags}
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
                    onClick={handleCreateDicoms}
                >
                    Create Dicoms
                </Button>
            </div>
        </>
    );
};

export default CreateRoot;
