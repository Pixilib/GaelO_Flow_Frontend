export type QueryStudy = {
    id : number,
    patientID : string,
    patientName : string,
    dateFrom: string,
    dateTo : string,
    modalitiesInStudy: string[],
    studyDescription: string,
    accessionNumber: string,
}