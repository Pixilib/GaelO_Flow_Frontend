import { exportFileThroughFilesystemAPI } from "../services/export"


export const exportCsv = (csvString :string, extension:string, filename :string) => {

    // Create Blob from data and prefered fileType
    const blob = new Blob([csvString], { type: extension })

    // Export file to stream
    exportFileThroughFilesystemAPI(blob.stream(), 'text/csv', filename)
}