import axios from "axios"
import { QueryParseResponse, QueryParsedPayload } from "../utils/types";

export const postQueryParsed = (id: string, payload: QueryParsedPayload): Promise<QueryParseResponse[]> => {
  return axios
      .post(`/api/modalities/${id}/parsed-query`, payload)
      .then(response => response.data)
      .catch(error => {
          if (error.response) {
              throw error.response;
          }
          throw error;
      });
};



