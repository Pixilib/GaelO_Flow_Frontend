import axios from "axios";

export const getOrthancInstances = (): Promise<unknown> => {
  return axios.get("/api/system");
};