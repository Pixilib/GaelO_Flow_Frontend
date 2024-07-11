import axios from "axios";
import { Patient, Study, Series } from "../utils/types";

export const getOrthancSystem = (): Promise<unknown> => {
  return axios.get("/api/system").then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const orthancReset = (): Promise<null> => {
  return axios.post("/api/tools/reset")
    .then(function () {
      return null;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}

export const orthancShutdown = (): Promise<unknown> => {
  return axios.post("/api/tools/shutdown")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}


export const updateVerbosity = (level: string): Promise<null> => {
  return axios.put("/api/tools/log-level", level, { headers: { "Content-Type": "text/plain" } })
    .then(function () {
      return null;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}

export const getVerbosity = (): Promise<string> => {
  return axios.get("/api/tools/log-level")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}

export const getSeries = (seriesId: string): Promise<Series> => {
  return axios.get("/api/series/" + seriesId + '?=expand')
    .then(response => {
      const data = response.data
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
          seriesTime: data.MainDicomTags.seriesTime
        },
        parentStudy: data.ParentStudy,
        status: data.Status,
        type: data.Type
      }
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getStudies = (studyId: string): Promise<Study> => {
  return axios.get("/api/studies/" + studyId + '?=expand')
    .then((response) :Study => {
      const data = response.data
      return {
        id: data.ID,
        isStable: data.IsStable,
        labels: data.Labels,
        lastUpdate: data.LastUpdate,
        mainDicomTags: {
          accessionNumber: data.MainDicomTags.AccessionNumber,
          institutionName: data.MainDicomTags.InstitutionName,
          referringPhysicianName: data.MainDicomTags.ReferringPhysicianName,
          studyDate: data.MainDicomTags.StudyDate,
          studyDescription: data.MainDicomTags.StudyDescription,
          studyId: data.MainDicomTags.StudyID,
          studyInstanceUID: data.MainDicomTags.StudyInstanceUID,
          studyTime: data.MainDicomTags.StudyTime
        },
        patientMainDicomTags: {
          patientBirthDate: data.PatientMainDicomTags.PatientBirthDate,
          patientId: data.PatientMainDicomTags.PatientID,
          patientName: data.PatientMainDicomTags.PatientName,
          patientSex: data.PatientMainDicomTags.PatientSex
        },
        parentPatient: data.ParentPatient,
        series: data.Series,
        type: data.Type
      }
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};


export const getSeriesOfStudy = (studyId: string): Promise<Series[]> => {
  return axios.get("/api/studies/" + studyId + '/series?expand')
    .then(response => {
      const data = response.data
      //Formater camelcase series
      return data
    }
    ).catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};


export const getPatient = (patientId: string): Promise<Patient> => {
  return axios.get("/api/patients/" + patientId)
    .then((response): Patient => {
      const data = response.data
      return {
        id: data.ID,
        isStable: data.IsStable,
        Labels: data.Labels,
        lastUpdate: data.LastUpdate,
        mainDicomTags: {
          patientBirthDate: data.MainDicomTags.PatientBirthDate,
          patientId: data.MainDicomTags.PatientID,
          patientName: data.MainDicomTags.PatientName,
          patientSex: data.MainDicomTags.PatientSex
        },
        studies: data.Studies,
        type: data.Type
      }
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deletePatient = (patientId: string): Promise<void> => {
  return axios.delete("/api/patients/" + patientId)
    .then(() => {
      return undefined
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteStudy = (studyId: string): Promise<void> => {
  return axios.delete("/api/studies/" + studyId)
    .then(() => {
      return undefined
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const deleteSeries = (seriesId: string): Promise<void> => {
  return axios.delete("/api/series/" + seriesId)
    .then(() => {
      return undefined
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
