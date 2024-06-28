import { useState, ChangeEvent, FormEvent } from "react";
import { FormButton, Input, Label, SelectInput } from "../ui";
import { Option } from "../utils";
import moment from "moment";
import { QueryPayload as QueryPayload } from "../utils/types";
import { FaSearch } from "react-icons/fa";
import SelectModalities from "./SelectModalities";

type SearchFormProps = {
    aets: Option[];
    labelsData: Option[];
    showLabels: boolean;
    onSubmit: (formData: QueryPayload) => void;
};

const SearchForm = ({ aets, labelsData, showLabels, onSubmit }: SearchFormProps) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");
    const [accessionNumber, setAccessionNumber] = useState<string>("");
    const [studyDescription, setStudyDescription] = useState<string>("");
    const [dataPreset, setDataPreset] = useState<Option[]>([]);
    const [modalities, setModalities] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [label, setLabel] = useState<Option[]>([]);

    console.log(aets)
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
        setDateFrom(value);
        setDataPreset([{ value: null, label: "None" }]);
    };

    const handleDataToChange = (value: string) => {
        setDateTo(value);
        setDataPreset([{ value: null, label: "None" }]);
    };

    const handleChangeDataPreset = (selectedOption: Option) => {
        setDataPreset([selectedOption]);
        if (selectedOption && selectedOption.value !== null) {
            const days = selectedOption.value as number;
            const date = moment().subtract(days, 'days').format('YYYY-MM-DD');
            setDateTo(moment().format('YYYY-MM-DD'));
            setDateFrom(date);
        } else {
            setDateFrom("");
            setDateTo("");
        }
    };

    const handleLabelChange = (selectedOptions: Option[]) => {
        setLabel(selectedOptions || []);
    };

    const isDateDisabled = dataPreset.length > 0 && dataPreset[0].value !== null;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        //Prepare Date string for post data
        let dateString = '';
        const dicomDateFrom = dateFrom.split('-').join('')
        const dicomDateTo = dateTo.split('-').join('')
        if (dicomDateFrom !== '' && dicomDateTo !== '') {
            dateString = dicomDateFrom + '-' + dicomDateTo
        } else if (dicomDateFrom === '' && dicomDateTo !== '') {
            dateString = '-' + dicomDateTo
        } else if (dicomDateFrom !== '' && dicomDateTo === '') {
            dateString = dicomDateFrom + '-'
        }

        //Prepare POST payload for query (follow Orthanc APIs)
        let queryPayload: QueryPayload = {
            Level: 'Study',
            Query: {
                PatientName: patientName,
                PatientID: patientId,
                StudyDate: dateString,
                Modality: modalities.join('\\'),
                StudyDescription: studyDescription,
                AccessionNb: accessionNumber,
            }
        }
        onSubmit(queryPayload);
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
                    label={<Label value="Accession" className="text-sm font-medium text-center" align="left" />}
                    type="text"
                    placeholder="Search by accession"
                    className="mt-1 lg:mt-3"
                    value={accessionNumber !== null ? accessionNumber.toString() : ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setAccessionNumber(event.target.value)}
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
                    <SelectModalities
                        modalities={modalities}
                        onChange={(modalities) => setModalities(modalities)}
                        closeMenuOnSelect={false}
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
            <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-4 lg:gap-11">
                <div className="grid">
                    <Label
                        value="Data Preset"
                        className="text-sm font-medium"
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
                    value={dateFrom ?? undefined}
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
                    value={dateTo ?? undefined}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleDataToChange(event.target.value)
                    }
                    className={"focus:shadow-2xl shadow-lg disabled:text-slate-500"}
                    disabled={isDateDisabled}
                />
            </div>
            <div className="grid grid-cols-1 col-span-2 my-3 place-content-center">
                <FormButton text={"Query"} icon={<FaSearch size="1.3rem" />} />
            </div>
        </form>
    );
};

export default SearchForm;


