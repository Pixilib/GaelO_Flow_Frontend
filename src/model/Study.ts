import { getStudy } from "../services/orthanc";
import Patient from "./Patient";
import Series from "./Series";
import type { StudyMainDicomTags, Study as StudyType } from "./../utils/types";

class Study {
  id: string;
  studyId: string | null = null;
  studyDescription: string | null = null;
  studyDate: string | null = null;
  studyTime: string | null = null;
  accessionNumber: string | null = null;
  studyInstanceUID?: string;
  patient: Patient | null = null;
  series: Series[];

  constructor(id: string) {
    this.id = id;
    this.series = [];
  }

  async fillFromOrthanc() {
    const study = await getStudy(this.id);
    this.studyDescription = study.mainDicomTags.studyDescription;
    this.studyDate = study.mainDicomTags.studyDate;
    this.studyTime = study.mainDicomTags.studyTime;
    this.studyInstanceUID = study.mainDicomTags.studyInstanceUID;
    this.accessionNumber = study.mainDicomTags.accessionNumber;
    this.studyId = study.mainDicomTags.studyId;
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
    this.accessionNumber = studyData.mainDicomTags.accessionNumber;
    this.studyId = studyData.mainDicomTags.studyId;
  }

  setPatient = (patient: Patient) => {
    this.patient = patient;
  };

  getAllseries = () => {
    return this.series.map((series) => series.toJSON());
  };

  getAllSeriesObject = () => {
    return this.series
  }

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

  getMainDicomTags = () :StudyMainDicomTags => {
    return {
      accessionNumber : this.accessionNumber,
      studyDescription : this.studyDescription,
      studyDate : this.studyDate,
      studyTime : this.studyTime,
      studyId : this.studyId,
      studyInstanceUID : this.studyInstanceUID
    }
  }

  toJSON = ()  : Record<string,any> => {
    return {
      id: this.id,
      studyDescription: this.studyDescription,
      studyDate: this.studyDate,
      studyTime: this.studyTime,
      studyId: this.studyId,
      accessionNumber: this.accessionNumber,
      studyInstanceUID: this.studyInstanceUID as string,
      series: this.series.map((series) => series.toJSON()),
      patientId: this.patient?.id,
      patient : this.patient?.toJSON()
    };
  };
}

export default Study;
