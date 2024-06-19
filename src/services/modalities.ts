import axios from "axios";
import { Modality, ModalityExtended } from "../utils/types";



function handleAxiosError(error: any) {
    if (error.response) {
        throw error.response;
    }
    throw error;
}

export const updateModality = (
    modality: Modality
): Promise<Modality> => {
    const payload = {
        AET: modality.aet,
        Host: modality.host,
        Port: modality.port,
        Manufacturer: modality.manufacturer
    }
    return axios.put(`/api/modalities/${modality.name}`, payload)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const deleteModality = (name: string): Promise<string> => {
    return axios.delete(`/api/modalities/${name}`)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const getModalities = (): Promise<ModalityExtended[]> => {
    return axios.get("/api/modalities?expand")
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const echoModality = (name :string): Promise<void> => {
    return axios.post("/api/modalities/" + name + "/echo")
        .then(() => undefined)
        .catch(handleAxiosError);
};