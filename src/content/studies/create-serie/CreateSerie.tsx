import TagTable from "../../../import/create/TagTable";
import CreateForm from "../../../import/create/CreateForm";
import { Button, Modal } from "../../../ui";
import { useState } from "react";
import { Colors, useCustomMutation, useCustomToast } from "../../../utils";
import { createDicom } from "../../../services/instances";
import CreateDrop from "../../../import/create/CreateDrop";
import CurrentDicomsTags from "./CurrentDicomsTagsTable";
import { Tag } from "./DicomTagType";

type CreateSerieProps = {
    studyId: string;
    show: boolean;
    onClose: () => void;
}

const CreateSerie = ({ studyId, show, onClose }: CreateSerieProps) => {
    const [newTags, setNewTags] = useState<Tag[]>([]);
    const [ currentTagsOpened, setCurrentTagsOpened ] = useState(false)
    const { toastSuccess, toastError } = useCustomToast();
    const [files, setFiles] = useState<File[]>([])

    const { mutate } = useCustomMutation(
        ({ content, tags, parent }) => createDicom(content, tags, false, parent),
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

    const handleAddTag = (tag: { name: string; value: string }) => {
        setNewTags((prevTags) => [...prevTags, tag]);
    };

    const handleDeleteTag = (name: string) => {
        setNewTags((prevTags) => prevTags.filter((tag) => tag.name !== name));
    };

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

    return (
        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose} >
                <Modal.Title>Create Serie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <CreateDrop
                        files={files}
                        onDrop={setFiles}
                    />
                    <div>
                        <CreateForm
                            title="Define DICOM Tags"
                            onAddTag={handleAddTag}
                        />
                        <TagTable
                            data={newTags}
                            onDeleteTag={handleDeleteTag}
                        />
                    </div>
                    <CurrentDicomsTags
                        studyId={studyId}
                        isOpen={currentTagsOpened}
                        toggleOpen={() => setCurrentTagsOpened(!currentTagsOpened)}
                    />
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