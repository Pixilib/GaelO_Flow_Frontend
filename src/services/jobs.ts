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