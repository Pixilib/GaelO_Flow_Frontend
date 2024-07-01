import { useMemo, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from "react-icons/bs";

import { sendDicom } from '../../services/instances';
import Model from "../../model/Model";
import { useCustomMutation } from '../../utils';
import { OrthancImportDicom } from "../../utils/types";

import ImportTableStudy from "./ImportTableStudy"; // Importer le composant
import ImportTableSeries from "./ImportTableSeries";

type errorImportDicom = {
  [filename: string]: string
}

const ImportDrop = () => {

  const refModel = useRef<Model>(new Model())

  const [isUploading, setIsUploading] = useState(false)
  const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0)
  const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0)
  const [errors, setErrors] = useState<errorImportDicom[]>([])
  const [currentStudyInstanceUID, setCurrentStudyInstanceUID] = useState<null|string>(null)

  const uploadComplete = useMemo(()=>{
    return numberOfLoadedFiles === numberOfProcessedFiles
  }, [numberOfLoadedFiles, numberOfProcessedFiles])

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

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setNumberOfLoadedFiles((loadedFiles) => loadedFiles + acceptedFiles.length)
      setIsUploading(true)

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
    }
  });

  const handleStudyClick = (studyInstanceUID :string) => {
    setCurrentStudyInstanceUID(studyInstanceUID)

  }

  const studiesData = useMemo(() => {
    return refModel.current.getStudies()
  }, [JSON.stringify(refModel.current.toJSON())])

  const seriesData = useMemo(() => {
    if(!currentStudyInstanceUID) return []
    return refModel.current.getStudy(currentStudyInstanceUID).getAllseries()
  }, [currentStudyInstanceUID])

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        {...getRootProps({ onClick: open })}
        className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary ${isUploading ? 'cursor-progress' : 'cursor-pointer'} rounded-lg`}
      >
        {uploadComplete ? (
          <CheckIcon size={40} className="mb-2 text-green-500" />
        ) : (
          <CloudIcon size={40} className={`mb-2 ${isUploading ? "text-gray-400 animate-spin" : "text-primary"}`} />
        )}
        <p className="mb-2 text-primary">Drag the Dicom folder or ZIP, or click to select files</p>
        <input {...getInputProps()} />

        {numberOfLoadedFiles > 0 && (
          <div className="w-full">
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 h-2 transition-all duration-500 ease-out rounded bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${progression}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-center text-primary">{progression}%</p>
          </div>
        )}
      </div>
      <div className="w-full mt-4">
        <ImportTableStudy data={studiesData} onStudyClick={handleStudyClick} />
        { seriesData.length > 0 ? <ImportTableSeries data={seriesData} /> : null}
      </div>
    </div>
  );
};

export default ImportDrop;
