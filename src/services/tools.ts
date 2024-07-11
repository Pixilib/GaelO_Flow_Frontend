import axios from "axios"
import { QueryPayload, Study } from "../utils/types";

export const findTools = (payload: QueryPayload): Promise<Study[]> => {
    const updatedPayload = {
        ...payload,
        CaseSensitive: false,
        Expand: true,
    };
    return axios
        .post(`/api/tools/find`, updatedPayload)
        .then((response: any) => {
            return response.data.map((data: any) : Study => ({
                id: data.ID,
                isStable: data.IsStable,
                labels: data.Labels,
                lastUpdate: data.LastUpdate,
                mainDicomTags: {
                    accessionNumber: data.MainDicomTags.AccessionNumber,
                    referringPhysicianName: data.MainDicomTags.ReferringPhysicianName,
                    studyDate: data.MainDicomTags.StudyDate,
                    studyDescription: data.MainDicomTags.StudyDescription,
                    studyId: data.MainDicomTags.StudyID,
                    studyInstanceUID: data.MainDicomTags.StudyInstanceUID,
                    studyTime: data.MainDicomTags.StudyTime,
                    institutionName : data.mainDicomTags.InstitutionName
                },
                parentPatient: data.ParentPatient,
                patientMainDicomTags: {
                    patientBirthDate: data.PatientMainDicomTags.PatientBirthDate,
                    patientId: data.PatientMainDicomTags.PatientID,
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