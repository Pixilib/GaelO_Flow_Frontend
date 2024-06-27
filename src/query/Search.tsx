import { useSelector } from "react-redux";
import { RootState } from "src/store";

import { getLabelsByRoleName, getModalities, postQueryParsed } from "../services";
import { useCustomQuery, Option, ModalityExtended, useCustomMutation, Colors } from "../utils";

import { Card, CardBody, FormCard } from "../ui";
import { QueryParseResponse, QueryParsedPayload } from '../utils/types';
import SearchForm from "./SearchForm";
import ResultsTable from "./ResultsTable";
import SeriesTable from "./SeriesTable";
import { useState } from "react";
import { getQueriesAnswers } from "../services/query";

type QueryFormProps = {
  title: string;
  className?: string;
};

const Search = ({ title, className }: QueryFormProps) => {
  const [studies, setStudies] = useState<QueryParseResponse[]>([]);
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

  const role = useSelector((state: RootState) => state.user.role?.Name);

  const { data: labelsData } = useCustomQuery<string[], Option[]>(
    ["labels"],
    () => getLabelsByRoleName(role ?? ""),
    {
      select: (labels) =>
        labels.map((label) => ({
          value: label,
          label: label,
        }))
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

  const { mutateAsync } = useCustomMutation<QueryParseResponse[], QueryParsedPayload>(
    (data) => postQueryParsed('self', data),
    [],
    {
      onSuccess: (data) => {
        setStudies(data)
      }
    }
  );

  const handleSubmit = async (formData: QueryParsedPayload) => {
    await mutateAsync(formData);
  }
  
  const handleRowClick = (AnswerId: string) => {
    setSelectedStudyId(AnswerId);
  };

  const { data: seriesData } = useCustomQuery<any[]>(
    selectedStudyId ? ['series', selectedStudyId] : [],
    () => getQueriesAnswers(selectedStudyId!),
    {
      enabled: !!selectedStudyId,
    }
  );
  
  return (
    <>
      <FormCard
        className={`${className} gap-y-7 flex flex-col justify-center -z-10`}
        title={title}
        collapsible={true}
      >
        <SearchForm
          aets={aets ?? []}
          labelsData={labelsData ?? []}
          showLabels
          onSubmit={handleSubmit}
        />
      </FormCard>
      <Card >
        <CardBody color={Colors.light} className="rounded-xl">
          <h2 className="mt-4 mb-5 text-2xl font-bold text-primary">Results</h2>
          <div className="grid grid-cols-1 gap-4 mt-3 lg:grid-cols-2">
            <ResultsTable results={studies} onRowClick={handleRowClick} />
            <SeriesTable series={seriesData ?? []} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Search;
