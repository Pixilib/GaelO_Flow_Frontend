import TagTable from "../../import/create/TagTable";
import CreateForm from "../../import/create/CreateForm";
import { Button, Modal, Spinner } from "../../ui";
import { useEffect, useState } from "react";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import { Study } from "../../utils/types";
import { getStudy } from "../../services/orthanc";
import { createDicom } from "../../services/instances";
import CreateDrop from "../../import/create/CreateDrop";
import { current } from "@reduxjs/toolkit";

type CreateSerieProps = {
    studyId: string;
    show: boolean;
    onClose: () => void;
}

type Tag = {
    name: string;
    value: string;
    isDeletable: boolean;
}

const CreateSerie = ({ studyId, show, onClose }: CreateSerieProps) => {
    const [ags, setNewTags] = useState<Tag[]>([]);
    const [tagsToDisplay, setTagsToDisplay] = useState<Tag[]>([]);
    const { toastSuccess, toastError } = useCustomToast();
    const [files, setFiles] = useState<File[]>([])

    const { mutate } = useCustomMutation(
        ({ content, tags, parent }) => createDicom(content, tags, true, parent),
        [[]],
        {
            onSuccess: () => {
                toastSuccess('Dicom series created')
                onClose()
            },
            onError: () => {
                toastError('Unable to create series')
            }
        }
    )

    const handleAddTag = (tag: { name: string; value: string, isDeletable: boolean }) => {
        setNewTags((prevTags) => [...prevTags, tag]);
        setTagsToDisplay((prevTags) => [...prevTags, tag]);
    };

    const handleDeleteTag = (name: string) => {
        setNewTags((prevTags) => prevTags.filter((tag) => tag.name !== name));
        setTagsToDisplay((prevTags) => prevTags.filter((tag) => tag.name !== name));
    };

    const { data: editingStudyDetails, isPending } = useCustomQuery<Study>(
        ['studies', studyId],
        () => getStudy(studyId),
        {
            onError: (error: any) => {
                toastError("Failed to load study details: " + error);
            },
        }
    );

    useEffect(() => {
        if (!editingStudyDetails) return;

        const tagsArray = Object.entries(editingStudyDetails?.mainDicomTags).map(
            ([key, value]) => ({ name: key, value: value, isDeletable: false })
        );
        setTagsToDisplay((prevTags) => [...prevTags, ...tagsArray]);
    }, [editingStudyDetails]);

    const handleCreateSerie = async () => {
        const content: string[] = []
        for (const file of files) {
            const dataURI = await readFileAsDataURL(file)
            content.push(dataURI)
        }
        const formattedtags = {}
        newTags.forEach(tag => formattedtags[tag.name] = tag.value);
        mutate({ content: content, tags: formattedtags, parent: studyId })
    }

    const readFileAsDataURL = (file: File) => {
        return new Promise<string>((resolve) => {
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result as string)
            }
        })
    }

    if (isPending) return <Spinner />;

    return (
        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose} >
                <Modal.Title>Create Serie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div>
                        <CreateDrop
                            files={files}
                            onDrop={setFiles}
                        />
                        <CreateForm
                            title="Define DICOM Tags"
                            onAddTag={handleAddTag}
                        />
                        <TagTable
                            data={tagsToDisplay}
                            onDeleteTag={handleDeleteTag}
                        />
                    </div>
                    <Button
                        onClick={handleCreateSerie}
                        className="w-60 self-center"
                        color={Colors.primary}
                        children={<p>Create Serie</p>}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CreateSerie;