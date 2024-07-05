import Instance from "./Instance"
import Patient from "./Patient"
import Series from "./Series"
import Study from "./Study"
import type { Study as StudyType } from "./../utils/types"

class Model {
    patients: Patient[]

    constructor() {
        this.patients = []
    }

    isPatientIdExists(patientId: string) {
        const knownPatientIds = this.patients.map(patient => patient.id)
        return knownPatientIds.includes(patientId)
    }

    addPatient(patient: Patient) {
        const knownPatientIds = this.patients.map(patient => patient.id)
        if (!knownPatientIds.includes(patient.id)) {
            this.patients.push(patient)
        }
    }

    getStudies() {
        const studies = this.patients.map(patient => patient.getStudies()).flat().map(study => study.toJSON())
        return studies
    }

    getStudy(studyInstanceUID: string): Study {
        const studies = this.patients.map(patient => patient.getStudies()).flat().filter(study => study.studyInstanceUID === studyInstanceUID)
        if (studies.length === 1) {
            return studies[0]
        }
        else throw "study not found"
    }

    addStudy(studyData: StudyType) {
        if (!this.isPatientIdExists(studyData.parentPatient)) {
            const patient = new Patient(studyData.parentPatient)
            patient.fillData(studyData.patientMainDicomTags)
            this.patients.push(patient)
        }

        const patient = this.patients.find(patient => patient.id === (studyData.parentPatient))
        if (patient && !patient.isStudyExists(studyData.id)) {
            const study = new Study(studyData.id)
            study.fillData(studyData)
            patient.addStudy(study)
        }
    }

    addInstance(instanceId: string, seriesId: string, studyId: string, patientId: string) {
        if (!this.isPatientIdExists(patientId)) {
            const patient = new Patient(patientId)
            patient.fillFromOrthanc()
            this.patients.push(patient)
        }

        const patient = this.patients.find(patient => patient.id === patientId)
        if (patient && !patient?.isStudyExists(studyId)) {
            const study = new Study(studyId)
            study.fillFromOrthanc()
            patient.addStudy(study)

        }

        const study = patient?.getStudy(studyId)
        if (study && !study?.isSeriesExists(seriesId)) {
            const series = new Series(seriesId)
            series.fillFromOrthanc()
            study.addSeries(series)
        }

        const series = study?.getSeries(seriesId)
        if (series && !series?.isInstanceExists(instanceId)) {
            const instance = new Instance(instanceId)
            series.addInstance(instance)
        }

    }

    toJSON = () => {
        return {
            'patients': this.patients.map(patient => patient.toJSON()),
        }
    }
}

export default Model