import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa"; 
import { ChangeEvent, useState } from "react";
import { FormButton, FormCard, Input, Label, SelectInput } from "../ui";

import { getLabelsByRoleName, getModalities } from "../services";
import { useCustomQuery, Modality, Option } from "../utils";


type QueryFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
};
//!WIP 
const SearchForm = ({ title, className, onClose }: QueryFormProps) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");
    const [accessionNumber, setAccessionNumber] = useState<number | null>(null);
    const [studyDescription, setStudyDescription] = useState<string>("");
    const [modality, setModality] = useState<Option[]>([]);
    const [dataFrom, setDataFrom] = useState<string>("");
    const [dataTo, setDataTo] = useState<string>("");
    const [dataPreset, setDataPreset] = useState<string>("");
    const [label, setLabel] = useState<Option[]>([]);

    const role = useSelector((state:RootState) => state.user.role?.Name);
    console.log(role)
    const { data: labelsData } = useCustomQuery<string[], Option[]>(
        ["labels"],
        ({role}) => getLabelsByRoleName({role}),
        // {
        //     select: (labels) =>
        //         labels.map((label) => ({
        //             value: label,
        //             label: label,
        //         })),
        // }
    );

    console.log(labelsData)
    const { data: aets } = useCustomQuery<Modality[], Option[]>(
        ['modalities'],
        () => getModalities(),
        {
            select: (modalities) =>
                modalities.map((modality) => ({
                    value: modality.name,
                    label: modality.name,
                })),
        }
    );

    const onSubmit = () => {
        console.log("QueryForm submitted");
    }

    const handleLabelChange = (selectedOptions: Option[]) => {
        setLabel(selectedOptions || []);
    }
    const handleModalityChange = (selectedOptions: Option[]) => {
        setModality(selectedOptions || []);
    }
    
    return (
        <FormCard
            className={`${className} gap-y-7`}
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
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-4 lg:gap-11 place-content-center">
                <Input
                    label={<Label value="Accession Number" className="text-sm font-medium text-center" align="left" />}
                    type="number"
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
                <div className="grid ">
                    <Label
                        value="Modalities"
                        className="text-sm font-medium text-center"
                        align="left"
                    />
                    <SelectInput
                        options={aets ?? []}
                        placeholder="Select Modality"
                        onChange={(options: Option[]) => handleModalityChange(options)}
                    />
                </div>
                <Input
                    label={<Label value="Data Preset" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by data preset"
                    className="mt-1 lg:mt-3"
                    value={dataPreset}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setDataPreset(event.target.value)}
                />

            </div>

            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-3 lg:gap-11">
                <Input
                    type="date"
                    label={
                        <Label
                            value={"Data From"}
                            className="text-sm font-medium text-center"
                            align="left"
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
                            align="left"
                            spaceY={2}
                        />
                    }
                    value={dataTo ?? undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDataTo(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg"}
                />
                <div className="grid">
                    <Label
                        value="Label"
                        className="text-sm font-medium text-center"
                        align="left"
                        spaceY={2}
                    />
                    <SelectInput
                        isMulti
                        closeMenuOnSelect={false}
                        options={labelsData || []}
                        onChange={(options: Option[]) => handleLabelChange(options)}
                        placeholder="Select Label(s)"
                        aria-label="Labels"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 col-span-2">
            <FormButton text={"Search"} icon={<FaSearch size="1.3rem" />} /> 
            </div>
        </FormCard>
    )
}
export default SearchForm;


