import moment from "moment";
import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { FormButton, FormCard, Input, Label, SelectInput } from "../ui";
import { getLabelsByRoleName, getModalities } from "../services";
import { useCustomQuery, Option } from "../utils";
import { ModalityExtended } from "src/utils/types";

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
    const [dataPreset, setDataPreset] = useState<Option[]>([]);
    const [modality, setModality] = useState<Option[]>([]);
    const [dataFrom, setDataFrom] = useState<string>("");
    const [dataTo, setDataTo] = useState<string>("");
    const [label, setLabel] = useState<Option[]>([]);

    const role = useSelector((state: RootState) => state.user.role?.Name);

    const { data: labelsData } = useCustomQuery<string[], Option[]>(
        ["labels"],
        () => getLabelsByRoleName(role ?? ""),
        {
            select: (labels) =>
                labels.map((label) => ({
                    value: label,
                    label: label,
                })),
        }
    );
    const { data: aets } = useCustomQuery<ModalityExtended[], Option[]>(
        ['modalities'],
        () => getModalities(),
        {
            select: (response) =>
                Object.entries(response).map(([name, aet]) => ({
                    value: name,
                    label: aet.AET,
                })),
        }
    );
    const dataPresetOptions: Option[] = [
        { value: null, label: "None" },
        { value: 0, label: "Today" },
        { value: 1, label: "Yesterday" },
        { value: 7, label: "Last Week" },
        { value: 31, label: "Last Month" },
        { value: 90, label: "Last 3 months" },
        { value: 365, label: "Last Year" },
    ];
    
    //make a variable boolean to know if dataTo to ou dataFrom is disabled
    
    const isDateDisabled = dataPreset.length > 0 && dataPreset[0].value !== null;
    
    const handleDataFromChange = (value: string) => {
        setDataFrom(value);
        setDataPreset([{ value: null, label: "None" }]);
    };

    const handleDataToChange = (value: string) => {
        setDataTo(value);
        setDataPreset([{ value: null, label: "None" }]);
    };

    const handleChangeDataPreset = (selectedOption: Option) => {
        setDataPreset([selectedOption]);
        if (selectedOption && selectedOption.value !== null) {
            const days = selectedOption.value as number;
            const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
            setDataTo(moment().format('YYYY-MM-DD'));
            setDataFrom(date);
        } else {
            setDataFrom("");
            setDataTo("");
        }
    };


    const onSubmit = () => {
        console.log("QueryForm submitted");
    };
    const handleLabelChange = (selectedOptions: Option[]) => {
        setLabel(selectedOptions || []);
    };

    const handleModalityChange = (selectedOptions: Option[]) => {
        setModality(selectedOptions || []);
    };

    return (
        <FormCard
            className={`${className} gap-y-7 flex flex-col justify-center`}
            title={title}
            collapsible
            onSubmit={onSubmit}
        >
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-2 lg:gap-11">
                <Input
                    label={<Label value="Patient Name *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient name"
                    className="mt-1 lg:mt-3"
                    value={patientName}
                    required
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => setPatientName(event.target.value)
                    }
                />
                <Input
                    label={<Label value="Patient Id *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient id"
                    className="mt-1 lg:mt-3"
                    value={patientId}
                    required
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => setPatientId(event.target.value)
                    }
                />
            </div>
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-4 lg:gap-11 place-content-center">
                <Input
                    label={<Label value="Accession Number" className="text-sm font-medium text-center" align="left" />}
                    type="number"
                    placeholder="Search by accession number"
                    className="mt-1 lg:mt-3"
                    value={accessionNumber ?? undefined}
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => setAccessionNumber(Number(event.target.value))
                    }
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
                        onChange={(options: Option[]) => handleModalityChange(options)}
                        isMulti
                        closeMenuOnSelect={false}
                        placeholder="Select Modalities(s)"
                        aria-label="Labels"
                    />
                </div>
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

            <div className="grid grid-cols-3 col-span-2 gap-3 lg:grid-cols-3 lg:gap-11">
                <div className="grid">
                    <Label
                        value="Data Preset"
                        className="text-sm font-medium text-center"
                        align="left"
                    />
                    <SelectInput
                        placeholder="Search by data preset"
                        options={dataPresetOptions}
                        aria-label="Data Preset"
                        onChange={(options: Option) => {
                            handleChangeDataPreset(options);
                        }}
                    />
                </div>
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
                        handleDataFromChange(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg disabled:text-slate-500"}
                    disabled={isDateDisabled}
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
                        handleDataToChange(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg disabled:text-slate-500"}
                    disabled={isDateDisabled}
                />
            </div>
            <div className="grid grid-cols-2 col-span-2">
                <FormButton text={"Search"} icon={<FaSearch size="1.3rem" />} />
            </div>
        </FormCard>
    );
};
export default SearchForm;
