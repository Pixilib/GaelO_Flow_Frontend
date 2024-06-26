import { useMemo, useRef, useState } from "react";
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from "react-icons/bs";
import { useDropzone } from 'react-dropzone';
import { useCustomMutation } from '../../utils';
import { sendDicom } from '../../services/instances';
import { OrthancImportDicom } from "../../utils/types";
import Model from "../../model/Model";

type errorImportDicom = {
  [filename: string]: string
}

const ImportDrop = () => {
  const refModel = useRef<Model>(new Model())
  const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0)
  const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0)
  const [errors, setErrors] = useState<errorImportDicom[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const progression = useMemo(() => {
    return Math.round((numberOfProcessedFiles / numberOfLoadedFiles) * 100)
  }, [numberOfProcessedFiles, numberOfLoadedFiles])

  const { mutateAsync: sendDicomMutate } = useCustomMutation<OrthancImportDicom>(
    ({ data }) => sendDicom(data),
    [[]],
  )

  const promiseFileReader = (file: File) => {
    return new Promise((resolve: (fileReader: FileReader) => void, reject) => {
      var fr = new FileReader()
      fr.readAsArrayBuffer(file)
      fr.onload = () => {
        resolve(fr)
      }
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setNumberOfLoadedFiles((loadedFiles) => loadedFiles + acceptedFiles.length)
      setIsUploading(true)
      setUploadComplete(false)

      for (const file of acceptedFiles) {
        await promiseFileReader(file).then(async (reader: FileReader) => {
          if (!reader.result) return

          try {
            const stringBuffer = new Uint8Array(reader.result as ArrayBuffer)
            const orthancAnswer = await sendDicomMutate({ data: stringBuffer })
            refModel.current.addInstance(orthancAnswer.id, orthancAnswer.parentSeries, orthancAnswer.parentStudy, orthancAnswer.parentPatient)
          } catch (e: any) {
            setErrors((errors) => [...errors, { [file.name]: e.statusText }])
          }
        })
        setNumberOfProcessedFiles(nbFiles => (nbFiles + 1))
      }

      setIsUploading(false)
      setUploadComplete(true)
    }
  });

  const data = useMemo(() => {
    return refModel.current.getStudies()
  }, [JSON.stringify(refModel.current.toJSON())])

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-white border-4 border-dashed rounded border-primary"
      >
        {uploadComplete ? (
          <CheckIcon size={32} className="mb-2 text-green-500" />
        ) : (
          <CloudIcon size={32} className={`mb-2 ${isUploading ? "text-gray-400 animate-spin" : "text-primary"}`} />
        )}
        <p className="text-primary">Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</p>
        <input {...getInputProps()} />
      </div>
      {numberOfLoadedFiles > 0 && (
        <div className="w-full mt-4">
          <div className="relative w-full h-4 bg-gray-200 rounded">
            <div
              className="absolute top-0 h-4 transition-all duration-500 ease-out bg-blue-500 rounded"
              style={{ width: `${progression}%` }}
            />
          </div>
          <p className="mt-2 text-center">{progression}%</p>
        </div>
      )}
      <div>
        {/* <ImportTableStudy /> */}
      </div>
    </div>
  );
};

export default ImportDrop;
