import { store } from '../store'
import { getPatient, getSeries, getSeriesOfStudy, getStudy } from "../services/orthanc"
import { addStudyToDeleteList } from '../reducers/DeleteSlice'
import { addStudyToAnonymizeList } from '../reducers/AnonymizeSlice'
import { addSeriesToExportList } from '../reducers/ExportSlice'

export const addStudyIdToDeleteList = async (studyId: string) => {
    const study = await getStudy(studyId)
    store.dispatch(addStudyToDeleteList({
        study: study
    }))

}

export const addStudyIdToAnonymizeList = async (studyId: string) => {
    const study = await getStudy(studyId)
    const patient = await getPatient(study.parentPatient)
    store.dispatch(addStudyToAnonymizeList({
        patient : {
            newPatientId: null,
            newPatientName: null,
            originalPatient: patient
        },
        study: {
            newPatientId: null,
            newPatientName: null,
            newAccessionNumber: "GaelO-Flow",
            newStudyDescription: study.mainDicomTags?.studyDescription ?? "",
            originalStudy: study
        }
    }))
}

export const addSeriesOfStudyIdToExportList = async (studyId: string) => {
    const study = await getStudy(studyId)
    const series = await getSeriesOfStudy(studyId)
    series.forEach(series =>
        store.dispatch(addSeriesToExportList({ series: series, study: study }))
    )
}

export const addSeriesToExportListFromSeriesId = async (seriesId: string) => {
    const series = await getSeries(seriesId)
    const study = await getStudy(series.parentStudy)
    store.dispatch(addSeriesToExportList({ series: series, study: study }))
}

export { addSeriesToExportList }
