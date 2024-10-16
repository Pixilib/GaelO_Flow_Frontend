import { useState } from "react";
import { FormCard } from "../ui";
import { getModalities, queryModality } from "../services";
import { useCustomQuery, Option, ModalityExtended, useCustomMutation, Colors, useCustomToast } from "../utils";
import { QueryResponse, QueryPayload, ExtendedQueryPayload } from '../utils/types';

import SearchForm from "./SearchForm";
import ResultsTable from "./ResultsTable";
import SeriesTable from "./SeriesTable";

type QueryFormProps = {
  className?: string;
};

const QueryRoot = ({ className }: QueryFormProps) => {

  const { toastError } = useCustomToast();

  const [studies, setStudies] = useState<QueryResponse[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const { data: aets } = useCustomQuery<ModalityExtended[], Option[]>(
    ['modalities'],
    () => getModalities(),
    {
      select: (response) => response.map((modality) => ({
        value: modality.name,
        label: modality.aet,
      })),
    }
  );

  const { mutateAsync: mutateQueryStudies } = useCustomMutation<QueryResponse[], ExtendedQueryPayload>(
    ({ queryPayload, aet }) => queryModality(aet, queryPayload),
    [],
    {
      onSuccess: (data) => {
        setStudies(data);
        setSeries([]);
      },
      onError: () => {
        toastError("Query Failed");
      }
    }
  );

  const { mutateAsync: mutateQuerySeries } = useCustomMutation<QueryResponse[], ExtendedQueryPayload>(
    ({ queryPayload, aet }) => queryModality(aet, queryPayload),
    [],
    {
      onSuccess: (data) => {
        setSeries(data);
      },
      onError: () => {
        toastError("Query Failed");
      }
    }
  );

  const handleSubmit = (formData: QueryPayload, aet?: string) => {
    if (!aet) {
      toastError("Choose AET to Query");
      return;
    }
    const extendedPayload = { queryPayload: formData, aet };
    mutateQueryStudies(extendedPayload);
  };

  const handleRowClick = (studyInstanceUID: string, originAET: string) => {

    const queryPayload: QueryPayload = {
      Level: 'Series',
      Query: { 
        Modality : '',
        ProtocolName: '',
        SeriesDescription: '',
        StudyInstanceUID: studyInstanceUID,
        SeriesInstanceUID: '',
        SeriesNumber: '',
        NumberOfSeriesRelatedInstances: ''
      }
    };
    const extendedPayload = { queryPayload, aet: originAET};
    mutateQuerySeries(extendedPayload);
  };

  return (
    <div className={`${className} space-y-6`}>
      <FormCard
        className="flex flex-col justify-center bg-white gap-y-7"
        title={"Search"}
        collapsible={true}
      >
        <SearchForm
          aets={aets ?? []}
          onSubmit={handleSubmit}
          withAets={true}
        />
      </FormCard>

      {/* Section for results and series tables */}
      <div className="flex flex-col w-full p-4 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">Results</div>
          <div className="text-lg text-gray-600">
            {studies.length} {studies.length === 1 ? "study" : "studies"} found
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <div className="2xl:col-span-1">
          <ResultsTable results={studies} onRowClick={handleRowClick} />
        </div>
        <div className="2xl:col-span-1">
          <SeriesTable series={series} />
        </div>
      </div>
    </div>
  );
};

export default QueryRoot;
