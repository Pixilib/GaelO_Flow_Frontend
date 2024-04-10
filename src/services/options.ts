import axios from "./axios";
import { OptionsResponse } from "src/utils/types";

export const getOptions = (): Promise<OptionsResponse> => {
  return axios
    .get("/api/options")
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
