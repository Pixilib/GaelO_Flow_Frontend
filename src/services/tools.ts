import axios from "axios"
import { QueryPayload, FindAnswer } from "../utils/types";

export const findTools = (payload: QueryPayload): Promise<FindAnswer[]> => {
    const updatedPayload = {
        ...payload,
        CaseSensitive: false,
        Expand: true,
    };
    return axios
        .post(`/api/tools/find`, updatedPayload)
        .then((response: any) => {
            return response.data.map((data: any) => ({
                id: data.ID,
                isStable: data.IsStable,
                labels: data.Labels,
                lastUpdate: data.LastUpdate,
                mainDicomTags: {
                    accesionNumber: data.MainDicomTags.AccessionNumber,
                    referringPhysicianName: data.MainDicomTags.ReferringPhysicianName,
                    studyDate: data.MainDicomTags.StudyDate,
                    studyDescription: data.MainDicomTags.StudyDescription,
                    studyID: data.MainDicomTags.StudyID,
                    studyInstanceUID: data.MainDicomTags.StudyInstanceUID,
                    studyTime: data.MainDicomTags.StudyTime
                },
                parentPatient: data.ParentPatient,
                patientMainDIcomTags: {
                    patientBirthDate: data.PatientMainDicomTags.PatientBirthDate,
                    patientID: data.PatientMainDicomTags.PatientID,
                    patientName: data.PatientMainDicomTags.PatientName,
                    patientSex: data.PatientMainDicomTags.PatientSex
                },
                series: data.Series,
                type: data.Type
            }));
        })
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}