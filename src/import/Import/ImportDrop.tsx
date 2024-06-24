import { useMemo, useRef, useState } from "react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useDropzone } from 'react-dropzone';
import { useCustomMutation } from '../../utils';
import { sendDicom } from '../../services/instances';
import { OrthancImportDicom } from "../../utils/types";
import Model from "../../model/Model";
import ImportTableStudy from './ImportTableStudy'

type errorImportDicom = {
  [filename: string]: string
}

const ImportDrop = () => {
  const refModel = useRef<Model>(new Model())
  const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0)
  const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0)
  const [errors, setErrors] = useState<errorImportDicom[]>([])


  const progression = useMemo(()=>{
    return Math.round((numberOfProcessedFiles / numberOfLoadedFiles) * 100)
  },[numberOfProcessedFiles, numberOfLoadedFiles])

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

    }
  });

  const data = useMemo(() => {
    return refModel.current.getStudies()
  },
    [JSON.stringify(refModel.current.toJSON())]
  )


  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center p-4 text-center bg-white border-4 border-dashed rounded border-primary"
      >
        <BsFillCloudArrowUpFill size={32} className="mb-2 text-primary" />
        <p className="text-primary">Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</p>
        <input {...getInputProps()} />
      </div>
      <div>
        <ImportTableStudy />
      </div>
    </div>

  );
};

export default ImportDrop;
