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


export const updateVerbosity = (level :string): Promise<null> => {
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
