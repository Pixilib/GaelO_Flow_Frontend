import { ProcessingJob } from "../utils/types";
import axios, { handleAxiosError } from "./axios";

export const createProcessingJob = (
  jobType: string,
  jobPayload: Record<string, any>
): Promise<string> => {
  const payload = {
    JobType: jobType,
    Payload: jobPayload,
  };

  return axios
    .post(`/api/processing`, payload)
    .then((response) => response.data.JobId)
    .catch(handleAxiosError);
};

export const getProcessingJob = (jobId: string): Promise<ProcessingJob> => {
  return axios
    .get(`/api/processing/` + jobId)
    .then((response) => {
      const data = response.data;
      return ({
        progress: data.Progress,
        state: data.State,
        id: data.Id,
        results: data.Results,
        userId: data.UserId,
        type: data.JobType,
        payload: data.Payload,
      });
    })
    .catch(handleAxiosError);
};

export const deleteProcessingJob = (jobId: string): Promise<void> => {
  return axios
    .delete(`/api/processing/` + jobId)
    .then((response) => undefined)
    .catch(handleAxiosError);
};
