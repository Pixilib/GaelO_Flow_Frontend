import axios from "./axios";
import { AnonymizeOptionPayload, AutoQueryOptionsPayload, Options } from "../utils/types";

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
        burnerLabelPath: data.BurnerLabelPath,
        burnerDataPath: data.BurnerDataPath,
        burnerManufacturer: data.BurnerManufacturer,
        burnerDeleteStudyAfterSent: data.BurnerDeleteStudyAfterSent,
        burnerSupportType: data.BurnerSupportType,
        burnerViewerPath: data.BurnerViewerPath,
        burnerTransferSyntax: data.BurnerTransferSyntax,
        burnerDateFormat: data.BurnerDateFormat,
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

export const updateCdBurnerOptions = (
  cdBurnerOptions: Partial<Options>
): Promise<void> => {
  const payload: any = {
    BurnerLabelPath: cdBurnerOptions.burnerLabelPath,
    BurnerManufacturer: cdBurnerOptions.burnerManufacturer,
    BurnerDeleteStudyAfterSent: cdBurnerOptions.burnerDeleteStudyAfterSent,
    BurnerSupportType: cdBurnerOptions.burnerSupportType,
    BurnerViewerPath: cdBurnerOptions.burnerViewerPath,
    BurnerTransferSyntax: cdBurnerOptions.burnerTransferSyntax,
    BurnerDateFormat: cdBurnerOptions.burnerDateFormat,
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
}
