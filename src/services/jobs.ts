import axios from "axios";
import { OrthancJob, postJobsAction } from "../utils/types2";

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

export const postJobs = (id: string, action: postJobsAction): Promise<unknown> => {
  return axios.post(`/api/jobs/${id}/${action}`)
    .then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
