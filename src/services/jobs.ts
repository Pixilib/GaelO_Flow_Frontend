import axios from "axios";

export const getJobs = (): Promise<unknown> => {
  return axios.get('/api/jobs?expand')
    .then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export type postJobsAction = "resume" | "pause" | "cancel" | "resubmit";

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
