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
