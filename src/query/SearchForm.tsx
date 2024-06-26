import { useState, ChangeEvent, FormEvent } from "react";
import { FormButton, Input, Label, SelectInput } from "../ui";
import { Option } from "../utils";
import moment from "moment";
import { QueryParsedPayload } from "../utils/types";
import { FaSearch } from "react-icons/fa";

type SearchFormProps = {
    aets: Option[];
    labelsData: Option[];
    showLabels: boolean;
    onSubmit: (formData: QueryParsedPayload) => void;
};

const SearchForm = ({ aets, labelsData, showLabels, onSubmit }: SearchFormProps) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");
    const [accessionNumber, setAccessionNumber] = useState<number | null>(null);
    const [studyDescription, setStudyDescription] = useState<string>("");
    const [dataPreset, setDataPreset] = useState<Option[]>([]);
    const [modality, setModality] = useState<Option[]>([]);
    const [dataFrom, setDataFrom] = useState<string>("");
    const [dataTo, setDataTo] = useState<string>("");
    const [label, setLabel] = useState<Option[]>([]);

    const dataPresetOptions: Option[] = [
        { value: null, label: "None" },
        { value: 0, label: "Today" },
        { value: 1, label: "Yesterday" },
        { value: 7, label: "Last Week" },
        { value: 31, label: "Last Month" },
        { value: 90, label: "Last 3 months" },
        { value: 365, label: "Last Year" },
    ];

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

    const handleLabelChange = (selectedOptions: Option[]) => {
        setLabel(selectedOptions || []);
    };

    const handleModalityChange = (selectedOptions: Option[]) => {
        setModality(selectedOptions || []);
    };

    const isDateDisabled = dataPreset.length > 0 && dataPreset[0].value !== null;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData: QueryParsedPayload = {
            Level: "series",
            Query: {
                PatientName: patientName,
                PatientID: patientId,
                StudyDate: dataFrom && dataTo ? `${dataFrom}-${dataTo}` : "",
                ModalitiesInStudy: modality.map(mod => mod.value).join(","),
                StudyDescription: studyDescription,
                AccessionNumber: String(accessionNumber) ?? "",
                NumberOfStudyRelatedInstances: "",
                NumberOfStudyRelatedSeries: "",
                SeriesDescription: "",
                SeriesInstanceUID: "",
                SeriesNumber: "",
                ProtocolName: "",
            }
        };
            onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-y-6">
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-2 lg:gap-11">
                <Input
                    label={<Label value="Patient Name *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient name"
                    className="mt-1 lg:mt-3"
                    value={patientName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientName(event.target.value)}
                />
                <Input
                    label={<Label value="Patient Id *" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by patient id"
                    className="mt-1 lg:mt-3"
                    value={patientId}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientId(event.target.value)}
                />
            </div>
            <div className={`grid grid-cols-1 col-span-2 gap-3 ${showLabels ? "lg:grid-cols-4" : "lg:grid-cols-3"} lg:gap-11 place-content-center`}>
                <Input
                    label={<Label value="Accession Number" className="text-sm font-medium text-center" align="left" />}
                    type="number"
                    placeholder="Search by accession number"
                    className="mt-1 lg:mt-3"
                    value={accessionNumber !== null ? accessionNumber.toString() : ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setAccessionNumber(Number(event.target.value))}
                />
                <Input
                    label={<Label value="Study Description" className="text-sm font-medium text-center" align="left" />}
                    placeholder="Search by study description"
                    className="mt-1 lg:mt-3"
                    value={studyDescription}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setStudyDescription(event.target.value)}
                />
                <div className="grid">
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
                        placeholder="Select Modalitie(s)"
                        aria-label="Labels"
                    />
                </div>
                {showLabels && (
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
                )}
            </div>
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-3 lg:gap-11">
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
                        onChange={(options: Option) => handleChangeDataPreset(options)}
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleDataToChange(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg disabled:text-slate-500"}
                    disabled={isDateDisabled}
                />
            </div>
            <div className="grid grid-cols-1 col-span-2 mt-3 place-content-center">
                <FormButton text={"Query"} icon={<FaSearch size="1.3rem" />} />
            </div>
        </form>
    );
};

export default SearchForm;


