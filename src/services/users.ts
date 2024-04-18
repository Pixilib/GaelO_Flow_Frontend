import { UserResponse } from "../utils/types";
import axios from "./axios";

export const getUsers = (): Promise<UserResponse> => {
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

