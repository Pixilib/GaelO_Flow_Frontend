import axios from "axios";

export const getOrthancSystem = (): Promise<unknown> => {
  return axios.get("/api/system").then(response => response.data)
  .catch(function (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  });
};

export const orthancReset = (): Promise<unknown> => {
  return axios.post("/api/tools/reset")
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
