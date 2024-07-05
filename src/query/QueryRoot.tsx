import { useState } from "react";

import { Card, CardBody, FormCard } from "../ui";
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
      select: (response) =>
        Object.entries(response).map(([name, aet]) => ({
          value: name,
          label: aet.AET,
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
  const handleSubmit = async (formData: QueryPayload, aet?: string) => {
    if (!aet) {
      toastError("Choose AET to Query");
      return;
    }
    const extendedPayload = { queryPayload: formData, aet };
    await mutateQueryStudies(extendedPayload);
  };


  const handleRowClick = async (studyInstanceUID: string, OriginAET?: string) => {
    const queryPayload: QueryPayload = {
      Level: 'Series',
      Query: { StudyUID: studyInstanceUID }
    };
    const extendedPayload = { queryPayload, aet: OriginAET ?? "self" };
    await mutateQuerySeries(extendedPayload);
  };


  return (
    <div>
      <FormCard
        className={`${className} gap-y-7 flex flex-col justify-center bg-white`}
        title={"Search"}
        collapsible={true}
      >
        <SearchForm
          aets={aets ?? []}
          onSubmit={handleSubmit}
          withAets={true}
        />
      </FormCard>
      <Card>
        <CardBody color={Colors.light} className="px-3 rounded-xl">
          <h2 className="mt-4 mb-5 text-2xl font-bold text-primary">Results</h2>
          <div className="grid grid-cols-1 gap-2 mt-1 xl:grid-cols-12">
            <div className="grid-cols-1 xl:col-span-7">
              <ResultsTable results={studies} onRowClick={handleRowClick} />
            </div>
            <div className="grid-cols-1 xl:col-span-5">
              <SeriesTable series={series} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default QueryRoot;
