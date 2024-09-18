import { store } from '../store'
import { getSeriesOfStudy, getStudy } from "../services/orthanc"
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
    store.dispatch(addStudyToAnonymizeList({
        study: {
            newPatientId: null,
            newPatientName: null,
            newAccessionNumber: null,
            newStudyDescription: null,
            originalStudy: study
        }
    }))
}

export const addSeriesOfStudyIdToExportList = async (studyId: string) => {
    const series = await getSeriesOfStudy(studyId)
    series.forEach(series =>
        store.dispatch(addSeriesToExportList({ series: series }))
    )
}

export { addSeriesToExportList }
