import axios from "axios";
import { Modality, ModalityExtended } from "../utils/types";

function handleAxiosError(error: any) {
  if (error.response) {
    throw error.response;
  }
  throw error;
}

export const updateModality = (modality: Modality): Promise<Modality> => {
  const payload = {
    AET: modality.aet,
    Host: modality.host,
    Port: modality.port,
    Manufacturer: modality.manufacturer,
  };
  return axios
    .put(`/api/modalities/${modality.name}`, payload)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

export const deleteModality = (name: string): Promise<string> => {
  return axios
    .delete(`/api/modalities/${name}`)
    .then((response) => response.data)
    .catch(handleAxiosError);
};

export const getModalities = (): Promise<ModalityExtended[]> => {
  return axios
    .get("/api/modalities?expand")
    .then((response) => {
      const data = response.data as Record<string,any>;
      return Object.entries(data).map(([name, modality]: [string, any]) => ({
        name : name,
        aet: modality.AET,
        allowEcho: modality.AllowEcho,
        allowEventReport: modality.AllowEventReport,
        allowFind: modality.AllowFind,
        allowFindWorklist: modality.AllowFindWorklist,
        allowGet: modality.AllowGet,
        allowMove: modality.AllowMove,
        allowNAction: modality.AllowNAction,
        allowStore: modality.AllowStore,
        allowTranscoding: modality.AllowTranscoding,
        host: modality.Host,
        localAet: modality.LocalAet,
        manufacturer: modality.Manufacturer,
        port: modality.Port,
        timeout: modality.Timeout,
        useDicomTls: modality.UseDicomTls,
      }));
    }).catch(handleAxiosError);
};

export const echoModality = (name: string): Promise<void> => {
  return axios
    .post("/api/modalities/" + name + "/echo")
    .then(() => undefined)
    .catch(handleAxiosError);
};
