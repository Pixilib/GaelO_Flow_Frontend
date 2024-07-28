import { getStudies } from "../services/orthanc";
import Patient from "./Patient";
import Series from "./Series";
import type { Study as StudyType } from "./../utils/types";

class Study {
  id: string;
  studyDescription: string | null = null;
  studyDate: string | null = null;
  studyTime: string | null = null;
  studyInstanceUID?: string;
  patient: Patient | null = null;
  series: Series[];

  constructor(id: string) {
    this.id = id;
    this.series = [];
  }

  async fillFromOrthanc() {
    const study = await getStudies(this.id);
    this.studyDescription = study.mainDicomTags.studyDescription;
    this.studyDate = study.mainDicomTags.studyDate;
    this.studyTime = study.mainDicomTags.studyTime;
    this.studyInstanceUID = study.mainDicomTags.studyInstanceUID;
    this.patient = new Patient(study.parentPatient);
    this.patient.setPatientId(study.patientMainDicomTags.patientId);
    this.patient.setPatientName(study.patientMainDicomTags.patientName);
    this.patient.setPatientBirthDate(
      study.patientMainDicomTags.patientBirthDate
    );
    this.patient.setPatientSex(study.patientMainDicomTags.patientSex);
  }

  fillData(studyData: StudyType) {
    this.studyDescription = studyData.mainDicomTags.studyDescription;
    this.studyDate = studyData.mainDicomTags.studyDate;
    this.studyTime = studyData.mainDicomTags.studyTime;
    this.studyInstanceUID = studyData.mainDicomTags.studyInstanceUID;
  }

  setPatient = (patient: Patient) => {
    this.patient = patient;
  };

  getAllseries = () => {
    return this.series.map((series) => series.toJSON());
  };

  getSeries = (seriesId: string) => {
    return this.series.find((series) => series.id === seriesId);
  };

  isSeriesExists = (seriesId: string) => {
    const knownSeriesIds = this.series.map((series) => series.id);
    return knownSeriesIds.includes(seriesId);
  };

  addSeries = (series: Series) => {
    const existingSeriesOrthancIds = this.series.map((series) => series.id);
    if (!existingSeriesOrthancIds.includes(series.id)) {
      this.series.push(series);
    }
  };

  getStudyInstanceUID = (): string => {
    if (!this.studyInstanceUID) throw "missing study instance uid";
    return this.studyInstanceUID;
  };

  toJSON = (): object => {
    return {
      id: this.id,
      studyDescription: this.studyDescription,
      studyDate: this.studyDate,
      studyTime: this.studyTime,
      studyInstanceUID: this.studyInstanceUID,
      series: this.series.map((series) => series.toJSON()),
      patient: this.patient?.toJSON() ?? null,
    };
  };
}

export default Study;
