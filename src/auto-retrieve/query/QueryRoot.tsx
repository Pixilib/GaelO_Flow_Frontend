import { useState } from "react";
import QueryTable from "./QueryTable";
import { Colors, QueryPayload } from "../../utils";
import { Button } from "../../ui";
import { Add } from "../../icons";
import { QueryStudy } from "../types";

const QueryRoot = () => {
  const [queries, setQueries] = useState<QueryStudy[]>([]);

  const addEmptyQuery = () => {
    setQueries((queries) => {
      queries.push({
        id : Math.random(),
        patientName: "",
        patientID: "",
        dateFrom: "",
        dateTo: "",
        modalitiesInStudy: [],
        studyDescription: "",
        accessionNumber: "",
      });
      return [...queries];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button color={Colors.warning} onClick={addEmptyQuery}>
          <Add />
        </Button>
      </div>
      <div>
        <QueryTable queries = {queries} />
      </div>
    </div>
  );
};

export default QueryRoot;
