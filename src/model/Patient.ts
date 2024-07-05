import { getPatient } from "../services/orthanc"
import Study from "./Study"
import type { PatientMainDicomTags } from '../utils/types'

class Patient {
    id: string
    patientId: string | null = null
    patientName: string | null = null
    patientBirthDate: string | null = null
    patientSex: string | null = null
    studies: Study[]

    constructor(id: string) {
        this.id = id
        this.studies = []
    }

    isStudyExists(studyId: string) {
        const knownStudyIds = this.studies.map(study => study.id);
        return knownStudyIds.includes(studyId);
    }

    setPatientId = (patientId: string) => {
        this.patientId = patientId
    }

    setPatientName = (patientName: string | null) => {
        this.patientName = patientName
    }

    setPatientSex = (patientSex: string | null) => {
        this.patientSex = patientSex
    }

    setPatientBirthDate = (patientBirthDate: string | null) => {
        this.patientBirthDate = patientBirthDate
    }

    async fillFromOrthanc() {
        const patient = await getPatient(this.id)
        const mainDicomTags = patient.mainDicomTags
        this.patientId = mainDicomTags.patientID;
        this.patientName = mainDicomTags.patientName;
        this.patientBirthDate = mainDicomTags.patientBirthDate;
        this.patientSex = mainDicomTags.patientSex;
    }

    fillData(patient: PatientMainDicomTags) {
        this.patientId = patient.patientID;
        this.patientName = patient.patientName;
        this.patientBirthDate = patient.patientBirthDate;
        this.patientSex = patient.patientSex;

    }

    getStudy = (studyId: string) => {
        return this.studies.find(study => study.id === studyId)
    }

    addStudy = (study: Study) => {
        const existingStudyOrthancIds = this.studies.map(study => study.id)
        if (!existingStudyOrthancIds.includes(study.id)) {
            this.studies.push(study)
        }
    }

    getStudies = () => {
        return this.studies
    }

    toJSON = () => {
        return {
            'id': this.id,
            'patientId': this.patientId,
            'patientName': this.patientName,
            'patientBirthDate': this.patientBirthDate,
            'patientSex': this.patientSex,
            'studies': this.studies.map(study => study.toJSON()),
        }
    }
}

export default Patient