import axios, { handleAxiosError } from "./axios";

export const createProcessingJob = (
  jobType: string,
  jobPayload: Record<string, any>
): Promise<string> => {
  const payload = {
    jobType,
    TmtvJob: jobPayload,
  };

  return axios
    .post(`/api/processing`, payload)
    .then((response) => response.data.JobId)
    .catch(handleAxiosError);
};

export const getProcessingJob = (jobId: string): Promise<string> => {
  return axios
    .get(`/api/processing/` + jobId)
    .then((response) => response.data.JobId)
    .catch(handleAxiosError);
};


export const deleteProcessingJob = (jobId: string): Promise<void> => {
    return axios
      .delete(`/api/processing/` + jobId)
      .then((response) => undefined)
      .catch(handleAxiosError);
  };
