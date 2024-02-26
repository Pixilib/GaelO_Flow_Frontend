import axios from "axios";

export const getOrthancSystem = (): Promise<unknown> => {
  console.log("getOrthancSystem");
  return axios.get("/api/system");
};

export const OrthancReset = (): Promise<unknown> => {
  return axios.post("/api/tools/shutdown");
}

export const OrthancShutdown = (): Promise<unknown> => {
  return axios.post("/api/tools/shutdown");
}
