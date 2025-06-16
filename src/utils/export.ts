import { exportFileThroughFilesystemAPI } from "../services/export"


export const exportCsv = (csvString :string, extension:string, filename :string) => {

    // Create Blob from data and prefered fileType
    const blob = new Blob([csvString], { type: extension })

    // Export file to stream
    exportFileThroughFilesystemAPI(blob.stream(), 'text/csv', filename)
}

export async function sha1(str) {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-1', enc.encode(str));
  return Array.from(new Uint8Array(hash))
    .map(v => v.toString(16).padStart(2, '0'))
    .join('');
}