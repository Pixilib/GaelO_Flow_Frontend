import axios from "axios";
import { JobMutationVariables, OrthancJob } from "../utils/types2";

export const getJobs = (): Promise<OrthancJob> => {
  return axios.get('/api/jobs?expand')
    .then(response => response.data as OrthancJob)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const postJobs = ({Id, Action}:JobMutationVariables): Promise<unknown> => {
  return axios.post(`/api/jobs/${Id}/${Action}`)
    .then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
