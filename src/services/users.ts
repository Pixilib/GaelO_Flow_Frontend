import axios from "./axios";

export const getUsers = (): Promise<unknown> => {
  return axios
    .get("/api/users")
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
