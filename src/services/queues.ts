import axios from "axios";
import {
  AnonItem,
  AnonQueue,
  AnonymizePayload,
  QueryQueueSeriesItem,
  QueryQueueStudyItem,
  Queue,
} from "../utils/types";
import { orthancStudyToStudy } from "./utils";

export const createDeleteQueue = (seriesId: string[]): Promise<string> => {
  const payload = {
    OrthancSeriesIds: seriesId,
  };
  return axios
    .post(`/api/queues/delete`, payload)
    .then((response) => response.data.Uuid)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getDeleteQueue = (uuid: string): Promise<Queue[]> => {
  return axios
    .get(`/api/queues/delete/${uuid}`)
    .then((response) => {
      const data: any = Object.values(response.data);
      return data.map((job) => ({
        userId: job.UserId,
        progress: job.Progress,
        state: job.State,
        id: job.Id,
        results: job.Results,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteDeleteQueue = (uuid: string): Promise<void> => {
  return axios
    .delete(`/api/queues/delete/${uuid}`)
    .then(() => undefined)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getExistingDeleteQueues = (
  userId: number | undefined
): Promise<string[]> => {
  const url = userId
    ? `/api/queues/delete?userId=${userId}`
    : "/api/queues/delete";
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const createAnonymizeQueue = (
  anonItems: AnonItem[]
): Promise<string> => {
  const payload: AnonymizePayload = {
    Anonymizes: anonItems,
  };
  return axios
    .post(`/api/queues/anonymize`, payload)
    .then((response) => response.data.Uuid)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getExistingAnonymizeQueues = (
  userId: number | undefined
): Promise<string[]> => {
  const url = userId
    ? `/api/queues/anonymize?userId=${userId}`
    : "/api/queues/anon";
  return axios
    .get(url)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getAnonymizeQueue = (uuid: string): Promise<AnonQueue[]> => {
  return axios
    .get(`/api/queues/anonymize/${uuid}`)
    .then((response) => {
      const data: any = Object.values(response.data);
      return data.map((job) => ({
        userId: job.UserId,
        progress: job.Progress,
        state: job.State,
        id: job.Id,
        results: job.Results ? orthancStudyToStudy(job.Results) : null,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteAnonymizeQueue = (uuid: string): Promise<void> => {
  return axios
    .delete(`/api/queues/anonymize/${uuid}`)
    .then(() => undefined)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const createQueryQueue = (
  studies: QueryQueueStudyItem[],
  series: QueryQueueSeriesItem[]
): Promise<string> => {
  const payload = {
    Studies: studies.map((study) => ({
      PatientName: study.patientName,
      PatientID: study.patientId,
      StudyDate: study.studyDate,
      Modality: study.modality,
      StudyDescription: study.studyDescription,
      AccessionNumber: study.accessionNumber,
      StudyInstanceUID: study.studyInstanceUID,
      Aet: study.aet,
    })),
    Series: series.map((series) => ({
      StudyInstanceUID: series.studyInstanceUID,
      Modality: series.modality,
      ProtocolName: series.protocolName,
      SeriesDescription: series.seriesDescription,
      SeriesNumber: series.seriesNumber,
      SeriesInstanceUID: series.seriesInstanceUID,
      Aet: series.aet,
    })),
  };
  return axios
    .post(`/api/queues/query`, payload)
    .then((response) => response.data.Uuid)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getExistingQueriesQueues = (
  userId: number | undefined
): Promise<string[]> => {
  const url = userId
    ? `/api/queues/query?userId=${userId}`
    : "/api/queues/query";
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getQueryQueue = (uuid: string) : Promise<Queue[]> => {
  return axios
    .get(`/api/queues/query/${uuid}`)
    .then((response) => {
      const data: any = Object.values(response.data);
      return data.map((job) => ({
        userId: job.UserId,
        progress: job.Progress,
        state: job.State,
        id: job.Id,
        results: job.Results,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteQueryQueue = (uuid: string): Promise<void> => {
  return axios
    .delete(`/api/queues/query/${uuid}`)
    .then(() => undefined)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
