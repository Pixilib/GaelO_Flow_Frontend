import React, { useState, ChangeEvent, FormEvent } from "react";
import moment from "moment";
import { dicomDateQueryStringFromDateFromDateTo, Option, QueryPayload, useCustomToast } from "../utils";
import { FormButton, Input, Label, SelectInput } from "../ui";
import SelectModalities from "./SelectModalities";
import { useTranslation } from "react-i18next";

type SearchFormProps = {
  aets?: Option[];
  existingLabels?: string[];
  onSubmit: (formData: QueryPayload, aets?: string) => void;
  withAets: boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({
  aets = [],
  existingLabels = [],
  onSubmit,
  withAets
}: SearchFormProps) => {
  const { toastWarning } = useCustomToast();

  const [patientName, setPatientName] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [accessionNumber, setAccessionNumber] = useState<string>("");
  const [studyDescription, setStudyDescription] = useState<string>("");
  const [aetsInput, setAetsInput] = useState<Option | null>(null);
  const [dataPreset, setDataPreset] = useState<Option | null>(null);
  const [modalities, setModalities] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const {t} = useTranslation()

  const dataPresetOptions: Option[] = [
    { value: 0.01, label: "Today" },
    { value: 1, label: "Yesterday" },
    { value: 7, label: "Last Week" },
    { value: 31, label: "Last Month" },
    { value: 90, label: "Last 3 months" },
    { value: 365, label: "Last Year" },
  ];

  const handleDataFromChange = (value: string) => {
    setDateFrom(value);
    setDataPreset({ value: null, label: "None" });
  };

  const handleDataToChange = (value: string) => {
    setDateTo(value);
    setDataPreset({ value: null, label: "None" });
  };

  const handleChangeDataPreset = (selectedOption: Option | null) => {
    setDataPreset(selectedOption);
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

  const handleLabelChange = (selectedOptions: Option[], meta) => {
    setLabels(selectedOptions.map(option => option.value) || []);
  };

  const isDateDisabled = dataPreset?.value != null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let queryPayload: QueryPayload = {
      Level: 'Study',
      Query: {
        PatientName: patientName,
        PatientID: patientId,
        StudyDate: dicomDateQueryStringFromDateFromDateTo(dateFrom, dateTo),
        ModalitiesInStudy : '',
        StudyDescription: studyDescription,
        AccessionNumber: accessionNumber,
      }
    };

    //Modality key not the same for Find Orthanc or Find Dicom Query
    if(withAets){
      queryPayload.Query.Modality =  modalities.join('\\')
    }else{
      queryPayload.Query.ModalitiesInStudy =  modalities.join('\\')
    }

    if (withAets && aets.length > 0) {
      const aet = aetsInput?.value;
      if (!aet) {
        toastWarning("Choose AET to Query");
        return;
      }
      onSubmit(queryPayload, aet);
    } else {
      onSubmit(queryPayload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gap-5">
      <div className="grid grid-cols-1 col-span-2 gap-3 lg:grid-cols-3 lg:gap-11">
        <div className="flex flex-col gap-2">
          <Label value="Patient Name *" className="text-sm font-medium" align="left" />
          <Input
            placeholder="Search by patient name"
            value={patientName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientName(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label value="Patient Id *" className="text-sm font-medium" align="left" />
          <Input
            placeholder="Search by patient id"
            value={patientId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientId(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label value="Accession" className="text-sm font-medium" align="left" />
          <Input
            type="text"
            placeholder="Search by accession"
            value={accessionNumber}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setAccessionNumber(event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 col-span-2 gap-3 mt-3 lg:grid-cols-3 lg:gap-11">
        <div className="flex flex-col gap-2">
          <Label value="Study Description" className="text-sm font-medium" align="left" />
          <Input
            placeholder="Search by study description"
            value={studyDescription}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setStudyDescription(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label value="Modalities" className="font-medium ext-sm " align="left" />
          <SelectModalities
            modalities={modalities}
            onChange={(modalities) => setModalities(modalities)}
            closeMenuOnSelect={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label value="Label" className="text-sm font-medium" align="left" />
          <SelectInput
            isMulti
            closeMenuOnSelect={false}
            options={existingLabels.map(label => ({ label: label, value: label })) || []}
            value={labels}
            onChange={handleLabelChange}
            placeholder="Select Label(s)"
            aria-label="Labels"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 col-span-2 gap-3 mt-3 lg:grid-cols-3 lg:gap-11">
        <div className="grid">
          <Label value="Data Preset" className="text-sm font-medium" align="left" />
          <SelectInput
            placeholder="Search by data preset"
            value={dataPreset?.value}
            options={dataPresetOptions}
            aria-label="Data Preset"
            isClearable
            onChange={(options: Option | null) => handleChangeDataPreset(options)}
          />
        </div>

        <Input
          type="date"
          label={<Label value="Data From" className="text-sm font-medium" align="left" />}
          value={dateFrom ?? undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleDataFromChange(event.target.value)}
          className="disabled:text-slate-500"
          disabled={isDateDisabled}
        />

        <Input
          type="date"
          label={<Label value="Data To" className="text-sm font-medium" align="left" />}
          value={dateTo ?? undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleDataToChange(event.target.value)}
          className="disabled:text-slate-500"
          disabled={isDateDisabled}
        />
      </div>

      {withAets && aets.length > 0 && (
        <div className="flex flex-col justify-around mt-3">
          <Label value="AET" className="text-sm font-medium" align="left" />
          <SelectInput
            value={aetsInput?.value}
            options={aets}
            placeholder="Search by AET"
            aria-label="AET"
            onChange={(options: Option) => setAetsInput(options)}
          />
        </div>
      )}

      <div className="flex justify-center col-span-2 lg:w-1/2 lg:mx-auto lg:gap-11">
        <div className={`${withAets && aets.length > 0 ? "w-1/2 mt-5" : "w-full"} flex justify-center items-center`}>
          <FormButton
            text={t("query.search")}
            type="submit"
            className=" lg:mt-10"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
