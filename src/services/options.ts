import axios from "./axios";
import { AutoQueryPayload, OptionsResponse } from "src/utils/types";

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

export const updateOptions =  (payload:AutoQueryPayload):Promise<void> =>{
return axios.patch("/api/options", payload)
    .then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
}