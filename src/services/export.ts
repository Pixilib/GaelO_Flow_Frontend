import { getToken } from "./axios";
import { showSaveFilePicker } from "native-file-system-adapter";

const getContentType = (headers: any) => {
  const contentType = headers.get("Content-Type");
  const parts = contentType?.split(",");
  return parts?.[0];
};

const getContentDispositionFilename = (headers: any) => {
  const contentDisposition = headers.get("Content-Disposition");
  const parts = contentDisposition?.split(";");
  let filename = parts[1].split("=")[1];
  return filename;
};

export const exportFileThroughFilesystemAPI = async (
  readableStream: ReadableStream<Uint8Array> | null,
  mimeType: string,
  suggestedName: string
) => {
  if (!readableStream) return;
  let acceptedTypes = [];

  let extension = suggestedName.split(".").pop();
  acceptedTypes.push({ accept: { [mimeType]: ["." + extension] } });

  const fileHandle = await showSaveFilePicker({
    _preferPolyfill: true,
    suggestedName: suggestedName,
    types: acceptedTypes,
    excludeAcceptAllOption: false, // default
  }).catch((err: any) => console.log(err));

  let writableStream = await (
    fileHandle as FileSystemFileHandle
  ).createWritable();

  await readableStream.pipeTo(writableStream);
};

export const exportRessource = (
  level: "studies"|"patients"|"series",
  studyId: string,
  transferSyntax: string | undefined = undefined
): Promise<any> => {
  const body = {
    Asynchronous: false,
    Transcode: transferSyntax,
  };

  return fetch("/api/"+level+"/" + studyId + "/archive", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      Accept: "application/zip",
    },
    body: JSON.stringify(body),
    //signal: abortController.signal
  })
    .then((answer) => {
      if (!answer.ok) throw answer;
      const readableStream = answer.body;
      let contentType = getContentType(answer.headers);
      let filename = getContentDispositionFilename(answer.headers);
      exportFileThroughFilesystemAPI(readableStream, contentType, filename);
      return true;
    })
    .catch((error) => {
      throw error;
    });
};
