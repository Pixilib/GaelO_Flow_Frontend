import { useEffect, useState } from "react";
import { Tag } from "./DicomTagType";
import ImmutableTagTable from "./ImmutableTagTable";
import { getStudy } from "../../../services/orthanc";
import { Colors, Study, useCustomQuery, useCustomToast } from "../../../utils";
import { Button, Spinner, ToggleChevron } from "../../../ui";

type CurrentDicomsTagsProps = {
    studyId: string;
    isOpen: boolean;
    toggleOpen: () => void;
}

const CurrentDicomsTags = ({ studyId, isOpen, toggleOpen }: CurrentDicomsTagsProps) => {
    const [currentTags, setCurrentTage] = useState<Tag[]>([]);
    const { toastError } = useCustomToast();

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
            ([key, value]) => ({ name: key, value: value })
        );
        setCurrentTage((prevTags) => [...prevTags, ...tagsArray]);
    }, [editingStudyDetails]);

    if (isPending) return <Spinner />

    return (
        <div>
            <Button
                onClick={toggleOpen}
                color={Colors.warning}
                children={
                    <div className="flex items-center">
                        <p>See current tags</p>
                        <ToggleChevron isOpen={isOpen} />
                    </div>
                }
            />
            {isOpen && (
                <ImmutableTagTable
                    data={currentTags}
                />
            )}
        </div>
    );
}

export default CurrentDicomsTags;