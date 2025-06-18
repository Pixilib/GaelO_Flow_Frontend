import axios from "axios";

const axiosInstance = axios.create();

const url = "https://v2-test.gaelo.fr";

const getHeader = (token) => {
  return {
    Authorization: "Bearer " + token,
  };
};

export const login = (email, password) => {
  let payload = {
    email: email,
    password: password,
  };
  return axiosInstance
    .post(url + "/api/login", payload)
    .then((answer) => answer.data)
    .catch((error) => {
      throw error;
    });
};

export const getStudiesFromUser = (token, userId) => {
  let header = getHeader(token);
  return axiosInstance
    .get(url + "/api/users/" + userId + "/studies", { headers: header })
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

export const getRoles = (token, userId, studyName) => {
  let header = getHeader(token);
  return axiosInstance
    .get(url + "/api/users/" + userId + "/roles?studyName=" + studyName, {
      headers: header,
    })
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

export const getVisitsTree = (token, studyName, role) => {
  let header = getHeader(token);
  return axiosInstance
    .get(url + "/api/studies/" + studyName + "/visits-tree?role=" + role, {
      headers: header,
    })
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

export const getPatient = (token, studyName, patientId, role) => {
  let header = getHeader(token);
  return axiosInstance
    .get(
      url +
        "/api/patients/" +
        patientId +
        "?role=" +
        role +
        "&studyName=" +
        studyName,
      { headers: header }
    )
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

export const getCreatableVisits = (token: string, patientId: string) => {
  let header = getHeader(token);
  return axiosInstance
    .get(url + "/api/patients/" + patientId + "/creatable-visits", {
      headers: header,
    })
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

export const getGaelOPatientLink = (
  studyName,
  role,
  patientId,
  token,
  userId
) => {
  console.log(url);
  return new URL(
    url +
      "/study/" +
      studyName +
      "/role/" +
      role +
      "/patient/" +
      patientId +
      "?token=" +
      token +
      "&userId=" +
      userId
  );
};

export const getGaelOInvestigatorFormLink = (
  studyName,
  role,
  visitId,
) => {
  return new URL(
    url + "/study/" + studyName + "/role/" + role + "/visit/" + visitId
  );
};

export const createVisit = (
  token: string,
  studyName: string,
  role: string,
  visitTypeId: number,
  patientId: string,
  statusDone: string,
  visitDate: string | null,
  reasonForNotDone?: string | null
) => {
  const header = getHeader(token);
  const payload = {
    patientId: patientId,
    visitDate: visitDate,
    statusDone: statusDone,
    reasonForNotDone: reasonForNotDone,
  };

  return axiosInstance
    .post(
      url +
        "/api/visit-types/" +
        visitTypeId +
        "/visits?role=" +
        role +
        "&studyName=" +
        studyName,
      payload,
      { headers: header }
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const validateDicomUpload = (
  token: string,
  visitId: string,
  originalOrthancId: string,
  tusUploadIds: string[],
  numberOfUploadedInstances: number
): Promise<any> => {
  const header = getHeader(token);
  const payload = {
    originalOrthancId: originalOrthancId,
    uploadedFileTusId: tusUploadIds,
    numberOfInstances: numberOfUploadedInstances,
  };

  return axiosInstance
    .post(
      url + `/api/visits/${visitId}/validate-dicom`,
      payload,
      { headers: header }
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const getVisit = (token, studyName, visitId, role) => {
  let header = getHeader(token);
  return axiosInstance
    .get(
      url +
        "/api/visits/" +
        visitId +
        "?role=" +
        role +
        "&studyName=" +
        studyName,
      { headers: header }
    )
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