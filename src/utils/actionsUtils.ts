import { store } from '../store'
import { getStudy } from "../services/orthanc"
import { addSeriesToDeleteList } from '../reducers/DeleteSlice'

export const addStudyToDeleteList = async (studyId: string) => {
    const study = await getStudy(studyId)
    store.dispatch(addSeriesToDeleteList({
        study: study
    }))

}