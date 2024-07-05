import axios from "axios";
import { OrthancImportDicom } from "../utils/types";

export const sendDicom = (payload: Uint8Array): Promise<OrthancImportDicom> => {
    return axios.post(`/api/instances`, payload, { headers: { 'Content-Type': 'application/dicom' } })
        .then((response: any) => {
            const data = response.data
            return {
                id: data.ID,
                parentPatient: data.ParentPatient,
                parentSeries: data.ParentSeries,
                parentStudy: data.ParentStudy
            }
        })
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};