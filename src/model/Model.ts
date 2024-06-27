import Instance from "./Instance"
import Patient from "./Patient"
import Series from "./Series"
import Study from "./Study"

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
        const studies = this.patients.map(patient=> patient.getStudies()).flat().map(study => study.toJSON())
        return studies
    }

    addInstance(instanceId: string, seriesId: string, studyId: string, patientId: string) {
        if (!this.isPatientIdExists(patientId)) {
            const patient = new Patient(patientId)
            patient.fillFromOrthanc()
            this.patients.push(patient)
        }

        const patient = this.patients.find(patient => patient.id === patientId)
        if (!patient?.isStudyExists(studyId)) {
            const study = new Study(studyId)
            study.fillFromOrthanc()
            patient.addStudy(study)

        }

        const study = patient?.getStudy(studyId)
        if (!study?.isSeriesExists(seriesId)) {
            const series = new Series(seriesId)
            series.fillFromOrthanc()
            study.addSeries(series)
        }

        const series = study?.getSeries(seriesId)
        if (!series?.isInstanceExists(instanceId)) {
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