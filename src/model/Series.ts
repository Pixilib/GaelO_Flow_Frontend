import { getSeries } from "../services/orthanc"
import Instance from "./Instance"
import Study from "./Study"

class Series {
    id: string
    modality : string|null = null
    seriesDescription: string|null = null
    seriesNumber: string|number|null = null
    seriesDate: string|null = null
    seriesTime: string|null = null
    seriesInstanceUID?: string
    study: Study|null = null
    instances: Instance[] = []

    constructor(id: string) {
        this.id = id
        this.instances = []
    }

    async fillFromOrthanc() {
        const series = await getSeries(this.id)
        this.seriesDescription = series.mainDicomTags.seriesDescription;
        this.seriesNumber = series.mainDicomTags.seriesNumber;
        this.seriesDate = series.mainDicomTags.seriesDate;
        this.seriesTime = series.mainDicomTags.seriesTime;
        this.seriesInstanceUID = series.mainDicomTags.seriesInstanceUID;
        this.modality = series.mainDicomTags.modality;
    }

    setStudy = (study: Study) => {
        this.study = study
    }

    isInstanceExists = (instanceId: string) => {
        const knownOrthancInstanceIds = this.instances.map(instance => instance.id)
        return knownOrthancInstanceIds.includes(instanceId)
    }

    getInstance = (instanceId: string) => {
        return this.instances.find(instance => instance.id === instanceId)
    }

    addInstance = (instance: Instance) => {
        const knownOrthancInstanceIds = this.instances.map(instance => instance.id)
        if (!knownOrthancInstanceIds.includes(instance.id)) {
            this.instances.push(instance)
        }
    }
    toJSON = () => {
        return {
            'id': this.id,
            'seriesDescription': this.seriesDescription,
            'seriesNumber': this.seriesNumber,
            'seriesDate': this.seriesDate,
            'seriesTime': this.seriesTime,
            'seriesInstanceUID': this.seriesInstanceUID,
            'instances': this.instances.map(instance => instance.toJSON()),
        }
    }
}

export default Series