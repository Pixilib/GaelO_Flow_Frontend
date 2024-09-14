import { getToken } from "./axios";
import { showSaveFilePicker } from "native-file-system-adapter";
import mime from "mime-types";

const getContentType = (headers: any) => {
  const contentType = headers.get("Content-Type");
  const parts = contentType?.split(",");
  return parts?.[0];
};

const getContentDispositionFilename = (headers: any) => {
  const contentDisposition = headers.get("Content-Disposition");
  const parts = contentDisposition?.split(";");
  if (!parts) return null;
  let filename = parts[1].split("=")[1];
  return filename;
};

export const exportFileThroughFilesystemAPI = async (
  readableStream: ReadableStream<Uint8Array> | null,
  mimeType: string,
  suggestedName: string | null,
  onProgress?: (mb: number) => void
) => {
  if (!readableStream) return;
  let acceptedTypes = [];

  let extension = mime.extension(mimeType);
  acceptedTypes.push({ accept: { [mimeType]: ["." + extension] } });

  const fileHandle = await showSaveFilePicker({
    _preferPolyfill: true,
    suggestedName: suggestedName ?? "download." + extension,
    types: acceptedTypes,
    excludeAcceptAllOption: false, // default
  }).catch((err: any) => console.log(err));

  let writableStream = await (
    fileHandle as FileSystemFileHandle
  ).createWritable();

  let loaded = 0;
  let progress = new TransformStream({
    transform(chunk, controller) {
      loaded += chunk.length;
      let progressMb = Math.round(loaded / 1000000);
      if (progressMb > 1) {
        if (onProgress) onProgress(progressMb);
      }
      controller.enqueue(chunk);
    },
  });

  await readableStream.pipeThrough(progress).pipeTo(writableStream);
};

export const exportRessource = (
  level: "studies" | "patients" | "series",
  studyId: string,
  onProgress = (_mb: number) => {},
  abortController = new AbortController(),
  transferSyntax: string | undefined = undefined,
): Promise<any> => {
  const body = {
    Asynchronous: false,
    Transcode: transferSyntax,
  };

  return fetch("/api/" + level + "/" + studyId + "/archive", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      Accept: "application/zip",
    },
    body: JSON.stringify(body),
    signal: abortController.signal
  })
    .then((answer) => {
      if (!answer.ok) throw answer;
      const readableStream = answer.body;
      let contentType = getContentType(answer.headers);
      let filename = getContentDispositionFilename(answer.headers);
      exportFileThroughFilesystemAPI(readableStream, contentType, filename, onProgress);
      return true;
    })
    .catch((error) => {
      throw error;
    });
};
