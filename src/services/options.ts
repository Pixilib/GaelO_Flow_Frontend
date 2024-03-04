import axios from "./axios";

export const getOptions = (): Promise<unknown> => {
  return axios
    .get("/api/options")
    .then((response) => response.data)
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
