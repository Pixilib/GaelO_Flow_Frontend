import { Study } from "../utils";

export const orthancStudyToStudy = (
  orthancStudy: Record<string, any>
): Study => {
  return {
    id: orthancStudy.ID,
    isStable: orthancStudy.IsStable,
    labels: orthancStudy.Labels,
    lastUpdate: orthancStudy.LastUpdate,
    mainDicomTags: {
      accessionNumber: orthancStudy.MainDicomTags.AccessionNumber,
      institutionName: orthancStudy.MainDicomTags.InstitutionName,
      referringPhysicianName: orthancStudy.MainDicomTags.ReferringPhysicianName,
      studyDate: orthancStudy.MainDicomTags.StudyDate,
      studyDescription: orthancStudy.MainDicomTags.StudyDescription,
      studyId: orthancStudy.MainDicomTags.StudyID,
      studyInstanceUID: orthancStudy.MainDicomTags.StudyInstanceUID,
      studyTime: orthancStudy.MainDicomTags.StudyTime,
    },
    patientMainDicomTags: {
      patientBirthDate: orthancStudy.PatientMainDicomTags.PatientBirthDate,
      patientId: orthancStudy.PatientMainDicomTags.PatientID,
      patientName: orthancStudy.PatientMainDicomTags.PatientName,
      patientSex: orthancStudy.PatientMainDicomTags.PatientSex,
    },
    parentPatient: orthancStudy.ParentPatient,
    series: orthancStudy.Series,
    type: orthancStudy.Type,
  };
};
