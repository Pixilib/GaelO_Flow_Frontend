import axios from "axios";

export const getOrthancSystem = (): Promise<unknown> => {
  return axios.get("/api/system").then(response => response.data);
};

export const orthancReset = (): Promise<unknown> => {
  return axios.post("/api/tools/reset");
}

export const orthancShutdown = (): Promise<unknown> => {
  return axios.post("/api/tools/shutdown");
}
