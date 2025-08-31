export type QueryStudy = {
    id : number,
    patientId : string,
    patientName : string,
    dateFrom: string,
    dateTo : string,
    modalitiesInStudy: string,
    studyDescription: string,
    accessionNumber: string,
    aet :string
}

export type QueryResultSeries = {
    id : number,
    patientId : string,
    patientName : string,
    dateFrom: string,
    dateTo : string,
    modality: string,
    studyDescription: string,
    seriesDescription: string,
    accessionNumber: string,
    originAET :string
    studyInstanceUID: string,
    seriesInstanceUID: string,
    seriesNumber: string,
    numberOfSeriesRelatedInstances: number,
}