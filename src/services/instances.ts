import axios from "axios";

export const sendDicom = (payload : Uint8Array): Promise<unknown> => {
    console.log(payload)
    return axios.post(`/api/instances`, payload, { headers: { 'Content-Type': 'application/dicom' } })
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};