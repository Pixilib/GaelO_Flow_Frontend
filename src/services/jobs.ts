import axios from "axios";
import { JobMutationPayload, OrthancJob } from "../utils/types2";

export const getJobs = (): Promise<OrthancJob[]> => {
  return axios
    .get("/api/jobs?expand")
    .then((response) => response.data as OrthancJob[])
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const postJobs = ({ Id, Action }: JobMutationPayload): Promise<void> => {
  return axios
    .post(`/api/jobs/${Id}/${Action}`)
    .then(() => undefined)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
