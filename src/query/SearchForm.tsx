import { ChangeEvent, useState } from "react";
import { FormCard, Input, Label, SelectInput } from "../ui";
import { Label as LabelType, Option } from "../utils/types";
import { useCustomQuery } from "../utils";
import { getLabels } from "../services/labels";


type QueryFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
};

const SearchForm = ({ title, className, onClose }: QueryFormProps) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");
    const [accessionNumber, setAccessionNumber] = useState<number | null>(null);
    const [studyDescription, setStudyDescription] = useState<string>("");
    const [modality, setModality] = useState<string>("");
    const [dataFrom, setDataFrom] = useState<string>("");
    const [dataTo, setDataTo] = useState<string>("");
    const [label, setLabel] = useState<{ value: string; label: string } | null>(null);
    


    const { data: labelsData } = useCustomQuery<LabelType[], Option[]>(
        ["labels"],
        getLabels,
        {
            select: (labels) =>
                labels.map((label) => ({
                    value: label.Name,
                    label: label.Name,
                })),
        }
    );
    
    const onSubmit = () => {
        console.log("QueryForm submitted");
    }


    console.log("labelsData", labelsData)
    return (
        <FormCard
            className={className}
            header={{
                onClose,
                title
            }}
            onSubmit={onSubmit}
        >
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-2 lg:gap-11">
                <Input
                    label={<Label value="Patient Name *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient name"
                    className="mt-1 lg:mt-3"
                    value={patientName}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientName(event.target.value)}
                />
                <Input
                    label={<Label value="Patient Id *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient id"
                    className="mt-1 lg:mt-3"
                    value={patientId}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientId(event.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-4 lg:gap-11">
                <Input
                    label={<Label value="Accession Number" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by accession number"
                    className="mt-1 lg:mt-3"
                    value={accessionNumber ?? undefined}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setAccessionNumber(Number(event.target.value))}
                />
                <Input
                    label={<Label value="Study Description" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by study description"
                    className="mt-1 lg:mt-3"
                    value={studyDescription}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setStudyDescription(event.target.value)}
                />
                <SelectInput
                options={[]}
                placeholder="Select Modality"
                value={modality}
                onChange={(event) => setModality(event.value)}
                />
                
            </div>

            <hr className="" />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-11">
                <Input
                    type="date"
                    label={
                        <Label
                            value={"Data From"}
                            className="text-sm font-medium text-center"
                            align="center"
                            spaceY={2}
                        />
                    }
                    value={dataFrom ?? undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDataFrom(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg"}
                />

                <Input
                    type="date"
                    label={
                        <Label
                            value={"Data To"}
                            className="text-sm font-medium text-center"
                            align="center"
                            spaceY={2}
                        />
                    }
                    value={dataTo ?? undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDataTo(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg"}
                />
                <div className="flex flex-col">
                <Label
                  value="Label"
                    className="text-sm font-medium text-center"
                    align="center"
                    spaceY={2}
                />
                <SelectInput
                    isMulti
                    options={labelsData || []}
                    value={label ?? undefined}
                    onChange={(event) => setLabel({ value: event.value, label: event.value })}
                    placeholder="Select Label(s)"
                    aria-label="Labels"
                />      
                </div>
            </div>
            div.grid.grid-cols-1.gap-3.lg:grid-cols-3.lg

        </FormCard>
    )
}
export default SearchForm;


