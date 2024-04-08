import axios from "axios";

interface Modality {
    name: string;
    aet: string; 
    host: string;
    port: number;
    manufacturer: string;
}

export const updateModality = (
  name: string, 
  aet: string, 
  host: string, 
  port: number, 
  manufacturer: string
): Promise<Modality> => {
    const payload = {
        AET: aet,
        Host: host,
        Port: port,
        Manufacturer: manufacturer
    };

    return axios.post(`/api/modalities/${name}`, payload)
        .then(response => response.data as Modality)
        .catch(error => {
            if (error.response) {
                throw error.response.data;
            }
            throw error.message;
        });
};

export const deleteModality = (name: string): Promise<string> => {
    return axios.delete(`/api/modalities/${name}`)
        .then(response => response.data as string)
        .catch(error => {
            if (error.response) {
                throw error.response.data;
            }
            throw error.message;
        });
};

export const getModalities = (): Promise<Modality[]> => {
    return axios.get("/api/modalities?expand")
        .then(response => response.data as Modality[])
        .catch(error => {
            if (error.response) {
                throw error.response.data;
            }
            throw error.message;
        });
};
