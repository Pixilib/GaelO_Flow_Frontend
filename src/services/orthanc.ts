import axios from "axios";
import {
  Patient,
  Study,
  Series,
  PatientModifyPayload,
  OrthancResponse,
  StudyModifyPayload,
  Instances,
  SeriesModifyPayload,
} from "../utils/types";
import { orthancStudyToStudy } from "./utils";

export const getOrthancSystem = (): Promise<unknown> => {
  return axios
    .get("/api/system")
    .then((response) => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const orthancReset = (): Promise<null> => {
  return axios
    .post("/api/tools/reset")
    .then(function () {
      return null;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const orthancShutdown = (): Promise<unknown> => {
  return axios
    .post("/api/tools/shutdown")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const updateVerbosity = (level: string): Promise<null> => {
  return axios
    .put("/api/tools/log-level", level, {
      headers: { "Content-Type": "text/plain" },
    })
    .then(function () {
      return null;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getVerbosity = (): Promise<string> => {
  return axios
    .get("/api/tools/log-level")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getSeries = (seriesId: string): Promise<Series> => {
  return axios
    .get("/api/series/" + seriesId + "?expand")
    .then((response) => {
      const data = response.data;
      return {
        expectedNumberOfInstances: data.ExpectedNumberOfInstances,
        id: data.ID,
        instances: data.Instances,
        isStable: data.IsStable,
        labels: data.Labels,
        lastUpdate: data.LastUpdate,
        mainDicomTags: {
          imageOrientationPatient: data.MainDicomTags.ImageOrientationPatient,
          manufacturer: data.MainDicomTags.Manufacturer,
          modality: data.MainDicomTags.Modality,
          operatorsName: data.MainDicomTags.OperatorsName,
          protocolName: data.MainDicomTags.ProtocolName,
          seriesDescription: data.MainDicomTags.SeriesDescription,
          seriesInstanceUID: data.MainDicomTags.SeriesInstanceUID,
          seriesNumber: data.MainDicomTags.SeriesNumber,
          stationName: data.MainDicomTags.StationName,
          seriesDate: data.MainDicomTags.SeriesDate,
          seriesTime: data.MainDicomTags.seriesTime,
        },
        parentStudy: data.ParentStudy,
        status: data.Status,
        type: data.Type,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getStudy = (studyId: string): Promise<Study> => {
  return axios
    .get("/api/studies/" + studyId + "?expand")
    .then((response): Study => {
      const data = response.data;
      return orthancStudyToStudy(data);
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getStudyStatistics = (studyId: string): Promise<any> => {
  return axios
    .get("/api/studies/" + studyId + "/statistics")
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
}

export const getLabelsOfStudy = (studyId: string): Promise<string[]> => {
  return axios
    .get("/api/studies/" + studyId + "/labels")
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

export const addLabelForStudy = (studyId: string, label: string): Promise<void> => {
  return axios
    .put("/api/studies/" + studyId + "/labels/" + label)
    .then(() => {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const removeLabelForStudy = (studyId: string, label: string): Promise<void> => {
  return axios
    .delete("/api/studies/" + studyId + "/labels/" + label)
    .then(() => {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getSeriesOfStudy = (studyId: string): Promise<Series[]> => {
  return axios
    .get(`/api/studies/${studyId}/series?expand`)
    .then((response: any): Series[] => {
      const mappedData = response.data.map(
        (data: any): Series => ({
          expectedNumberOfInstances: data.ExpectedNumberOfInstances,
          id: data.ID,
          instances: data.Instances,
          isStable: data.IsStable,
          labels: data.Labels,
          lastUpdate: data.LastUpdate,
          mainDicomTags: {
            imageOrientationPatient: data.MainDicomTags.ImageOrientationPatient,
            manufacturer: data.MainDicomTags.Manufacturer,
            modality: data.MainDicomTags.Modality,
            operatorsName: data.MainDicomTags.OperatorsName,
            protocolName: data.MainDicomTags.ProtocolName,
            seriesDescription: data.MainDicomTags.SeriesDescription,
            seriesInstanceUID: data.MainDicomTags.SeriesInstanceUID,
            seriesNumber: data.MainDicomTags.SeriesNumber,
            stationName: data.MainDicomTags.StationName,
            seriesDate: data.MainDicomTags.SeriesDate,
            seriesTime: data.MainDicomTags.SeriesTime,
          },
          parentStudy: data.ParentStudy,
          status: data.Status,
          type: data.Type,
        })
      );
      return mappedData;
    })
    .catch((error: any) => {
      if (error.response) {
        console.error("Error response:", error.response);
        throw error.response;
      }
      console.error("Error:", error);
      throw error;
    });
};

export const getInstancesOfSeries = (seriesId: string) => {
  return axios
    .get(`/api/series/${seriesId}/instances`)
    .then((response: any): Instances[] => {
      const mappedData = response.data.map(
        (data: any): Instances => ({
          fileSize: data.FileSize,
          fileUuid: data.FileUuid,
          id: data.ID,
          indexInSeries: data.IndexInSeries,
          labels: data.Labels,
          mainDicomTags: {
            acquisitionNumber: data.MainDicomTags.AcquisitionNumber,
            imageComments: data.MainDicomTags.ImageComments,
            imageOrientationPatient: data.MainDicomTags.ImageOrientationPatient,
            imagePositionPatient: data.MainDicomTags.ImagePositionPatient,
            instanceCreationDate: data.MainDicomTags.InstanceCreationDate,
            instanceCreationTime: data.MainDicomTags.InstanceCreationTime,
            instanceNumber: data.MainDicomTags.InstanceNumber,
            sopInstanceUID: data.MainDicomTags.SopInstanceUID,
            numberOfFrames: data.MainDicomTags.NumberOfFrames
          },
          parentSeries: data.ParentSeries,
          type: data.Type,
        })
      );
      return mappedData;
    })
    .catch((error: any) => {
      if (error.response) {
        console.error("Error response:", error.response);
        throw error.response;
      }
      console.error("Error:", error);
      throw error;
    });
};

export const modifyPatient = (
  patientId: string,
  patient: PatientModifyPayload
): Promise<OrthancResponse> => {
  const patientPayloadUpdate = {
    Replace: {
      PatientID: patient.replace.patientId,
      PatientName: patient.replace.patientName,
      PatientBirthDate: patient.replace.patientBirthDate,
      PatientSex: patient.replace.patientSex,
    },
    Keep: patient.keep,
    Remove: patient.remove.map(
      (field) => field.charAt(0).toUpperCase() + field.slice(1)
    ),
    RemovePrivateTags: patient.removePrivateTags,
    Force: true,
    Synchronous: false,
    KeepSource: patient.keepSource,
  };
  return axios
    .post(`/api/patients/${patientId}/modify`, patientPayloadUpdate)
    .then((response: any): OrthancResponse => {
      const data = response.data;
      return {
        id: data.ID,
        path: data.Path,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const modifyStudy = (
  studyId: string,
  study: StudyModifyPayload,
  transcode : string|undefined,
): Promise<OrthancResponse> => {
  const studyPayloadUpdate = {
    Replace: {
      PatientID: study.replace.patientId,
      PatientName: study.replace.patientName,
      PatientSex: study.replace.patientSex,
      PatientBirthDate: study.replace.patientBirthDate,
      AccessionNumber: study.replace.accessionNumber,
      StudyDate: study.replace.studyDate,
      StudyDescription: study.replace.studyDescription,
      StudyID: study.replace.studyId,
      ...study.replace.raw
    },
    Remove: study.remove.map(
      (field) => field.charAt(0).toUpperCase() + field.slice(1)
    ),
    RemovePrivateTags: study.removePrivateTags,
    Keep: study.keep,
    Force: true,
    Synchronous: false,
    KeepSource: study.keepSource,
    Transcode : transcode,
    KeepLabels: study.keepLabels,
  };
  return axios
    .post(`/api/studies/${studyId}/modify`, studyPayloadUpdate)
    .then((response: any): OrthancResponse => {
      const data = response.data;
      return {
        id: data.ID,
        path: data.Path,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const modifySeries = (
  seriesId: string,
  series: SeriesModifyPayload,
  transcode : string|undefined
): Promise<OrthancResponse> => {
  const seriesPayloadUpdate = {
    Replace: {
      ImageOrientationPatient: series.replace.imageOrientationPatient,
      Manufacturer: series.replace.manufacturer,
      Modality: series.replace.modality,
      OperatorsName: series.replace.operatorsName,
      ProtocolName: series.replace.protocolName,
      SeriesDescription: series.replace.seriesDescription,
      SeriesInstanceUID: series.replace.seriesInstanceUID,
      SeriesNumber: series.replace.seriesNumber,
      StationName: series.replace.stationName,
      SeriesDate: series.replace.seriesDate,
      SeriesTime: series.replace.seriesTime,
      ...series.replace.raw
    },
    Remove: series.remove.map(
      (field) => field.charAt(0).toUpperCase() + field.slice(1)
    ),
    RemovePrivateTags: series.removePrivateTags,
    Force: true,
    Synchronous: false,
    KeepSource: series.keepSource,
    Keep: series.keep,
    Transcode : transcode,
    MaskPixelData: {
      Regions: series.maskPixelData.map((mask) => {
        return {
          MaskType: mask.maskType,
          RegionType: mask.regionType,
          FilterWidth: mask.filterWidth,
          FillValue: mask.fillValue,
          Origin: mask.origin.filter((coord) => coord !== undefined),
          End: mask.end.filter((coord) => coord !== undefined),
        };
      }),
    }
  };
  return axios
    .post(`/api/series/${seriesId}/modify`, seriesPayloadUpdate)
    .then((response: any): OrthancResponse => {
      const data = response.data;
      return {
        id: data.ID,
        path: data.Path,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getPatient = (patientId: string): Promise<Patient> => {
  return axios
    .get("/api/patients/" + patientId)
    .then((response): Patient => {
      const data = response.data;
      return {
        id: data.ID,
        isStable: data.IsStable,
        Labels: data.Labels,
        lastUpdate: data.LastUpdate,
        mainDicomTags: {
          patientBirthDate: data.MainDicomTags.PatientBirthDate,
          patientId: data.MainDicomTags.PatientID,
          patientName: data.MainDicomTags.PatientName,
          patientSex: data.MainDicomTags.PatientSex,
        },
        studies: data.Studies,
        type: data.Type,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deletePatient = (patientId: string): Promise<void> => {
  return axios
    .delete("/api/patients/" + patientId)
    .then(() => {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteStudy = (studyId: string): Promise<void> => {
  return axios
    .delete("/api/studies/" + studyId)
    .then(() => {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteSeries = (seriesId: string): Promise<void> => {
  return axios
    .delete("/api/series/" + seriesId)
    .then(() => {
      return undefined;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
