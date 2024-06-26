import { useSelector } from "react-redux";
import { RootState } from "src/store";

import { getLabelsByRoleName, getModalities, postQueryParsed  } from "../services";
import { useCustomQuery, Option, ModalityExtended, useCustomMutation } from "../utils";

import { FormCard } from "../ui";
import { QueryParseResponse, QueryParsedPayload } from '../utils/types';
import SearchForm from "./SearchForm";

type QueryFormProps = {
  title: string;
  className?: string;
};

const Search = ({ title, className }: QueryFormProps) => {
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
  const mutation = useCustomMutation<QueryParseResponse[], QueryParsedPayload>(
    (data) => postQueryParsed('self', data),
    [['parsed-query']],
    {
      onSuccess: (response) => {
        console.log("Form data submitted successfully:", response);
      },
      onError: (error: any) => {
        console.error("Error submitting form data:", error);
      },
    }
  );


  return (
    <FormCard
      className={`${className} gap-y-7 flex flex-col justify-center -z-10`}
      title={title}
      collapsible={true}
    >
      <SearchForm
        aets={aets ?? []}
        labelsData={labelsData ?? []}
        showLabels
        onSubmit={(formData: QueryParsedPayload) => mutation.mutate(formData)}
      />

    </FormCard>
  );
};

export default Search;
