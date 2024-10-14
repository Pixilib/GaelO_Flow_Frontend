import { useMemo, useState } from "react";
import { Button } from "../ui";
import { Add, Cancel, Label } from "../icons";
import ToggleChevron from "../ui/menu/ToogleChevron";
import { Colors, useCustomMutation } from "../utils";
import { addLabelForStudy, removeLabelForStudy } from "../services/orthanc";
import SelectRoleLabels from "./SelectLabels";

type LabelProps = {
    selectedStudies: { [studyId: string]: boolean };
}
const Labels = ({ selectedStudies }: LabelProps) => {

    const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const { mutateAsync: addMutate } = useCustomMutation(
        ({ studyId, label }) => addLabelForStudy(studyId, label)
    )

    const { mutateAsync: deleteMutate } = useCustomMutation(
        ({ studyId, label }) => removeLabelForStudy(studyId, label)
    )

    const selectedStudiesId = useMemo(() => {
        return Object.entries(selectedStudies)?.filter(([id, status]) => status === true).map(([id, status]) => id)
    }, [selectedStudies])

    const handleAddLabels = async () => {
        for (const studyId of selectedStudiesId) {
            for (const label of selectedLabels) {
                await addMutate({ studyId, label })
            }
        }
    };

    const handleRemoveLabels = async () => {
        for (const studyId of selectedStudiesId) {
            for (const label of selectedLabels) {
                await deleteMutate({ studyId, label })
            }

        }
    };

    return (
        <div className="flex items-center gap-3">
            <Button
                color={Colors.primary}
                className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                onClick={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)}
            >
                <Label className="text-xl" />
                <span className="ml-2">Assign Labels</span>
                <ToggleChevron
                    isOpen={isLabelDropdownOpen}
                    className="ml-2" />
            </Button>
            {
                isLabelDropdownOpen && (
                    <div className="flex gap-3">

                        <div className="flex items-center gap-3">
                            <SelectRoleLabels
                                values={selectedLabels}
                                onChange={setSelectedLabels}
                            />
                            <Add
                                className="cursor-pointer text-primary hover:text-success-hover"
                                onClick={handleAddLabels}
                            />
                            <Cancel
                                className="cursor-pointer"
                                onClick={handleRemoveLabels}
                            />
                        </div>
                        <div className="flex justify-start mt-2">
                            <span>Apply to {selectedStudiesId.length} studies</span>
                        </div>
                    </div>

                )

            }
        </div>)

}

export default Labels