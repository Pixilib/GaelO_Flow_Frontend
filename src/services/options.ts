import axios from "./axios";
import { AnonymizeOptionPayload, AutoQueryOptionsPayload, Options } from "src/utils/types";

export const getOptions = (): Promise<Options> => {
  return axios
    .get("/api/options")
    .then(function (response) {
      const data = response.data;
      return {
        autoQueryHourStart: data.AutoQueryHourStart,
        autoQueryMinuteStart: data.AutoQueryMinuteStart,
        autoQueryHourStop: data.AutoQueryHourStop,
        autoQueryMinuteStop: data.AutoQueryMinuteStop,
        orthancMonitoringRate: data.OrthancMonitoringRate,
        burnerStarted: data.BurnerStarted,
        burnerLabelPath: data.BurnerLabelPath,
        burnerMonitoringLevel: data.BurnerMonitoringLevel,
        burnerManifacturer: data.BurnerManifacturer,
        burnerMonitoredPath: data.BurnerMonitoredPath,
        burnerDeleteStudyAfterSent: data.BurnerDeleteStudyAfterSent,
        burnerSupportType: data.BurnerSupportType,
        burnerViewerPath: data.BurnerViewerPath,
        burnerTransferSyntax: data.BurnerTransferSyntax,
        burnerDateFormat: data.BurnerDateFormat,
        burnerTranscoding: data.BurnerTranscoding,
        autorouterStarted: data.AutorouterStarted,
        orthancAddress: data.OrthancAddress,
        orthancPort: data.OrthancPort,
        orthancUsername: data.OrthancUsername,
        orthancPassword: data.OrthancPassword,
        redisAddress: data.RedisAddress,
        redisPort: data.RedisPort,
        keepLabels: data.AnonymizeKeepLabels,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const updateAnonymizeOptions = (
  anonymizeOptions: AnonymizeOptionPayload
): Promise<void> => {
  const payload = {
    AnonymizeKeepLabels: anonymizeOptions.anonymizeKeepLabels,
  };
  return axios
    .patch("/api/options", payload)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const updateAutoQueryOptions = (
  autoQueryOptions: AutoQueryOptionsPayload
): Promise<void> => {
  const payload = {
    AutoQueryHourStart: autoQueryOptions.autoQueryHourStart,
    AutoQueryMinuteStart: autoQueryOptions.autoQueryMinuteStart,
    AutoQueryHourStop: autoQueryOptions.autoQueryHourStop,
    AutoQueryMinuteStop: autoQueryOptions.autoQueryMinuteStop,
  };
  return axios
    .patch("/api/options", payload)
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
