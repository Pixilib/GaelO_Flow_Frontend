import axios from "axios";
import { JobPayload, OrthancJob } from "../utils/types";

export const getJobs = (): Promise<OrthancJob[]> => {
  return axios
    .get("/api/jobs?expand")
    .then((response) => {
      const data = response.data;
      return data.map((job: any) => ({
        id : job.ID,
        type: job.Type,
        progress: job.Progress,
        state: job.State,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const postJobs = ({ id, action }: JobPayload): Promise<unknown> => {
  return axios
    .post(`/api/jobs/${id}/${action}`)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getJobById = (id: string): Promise<OrthancJob> => {
  return axios
    .get(`/api/jobs/${id}`)
    .then((response) => {
      const data = response.data;
      return {
        id : data.ID,
        type: data.Type,
        progress: data.Progress,
        state: data.State,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
