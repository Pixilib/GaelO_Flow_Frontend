import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useCustomMutation } from '../../utils';
import { sendDicom } from '../../services/instances';

const ImportDrop = () => {

  const { mutate: sendDicomMutate } = useCustomMutation(
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

      for (const file of acceptedFiles) {
        await promiseFileReader(file).then(async (reader: FileReader) => {
          if (!reader.result) return
          const stringBuffer = new Uint8Array(reader.result as ArrayBuffer)
          sendDicomMutate({ data: stringBuffer })
        })
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center p-4 text-center bg-white border-4 border-dashed rounded border-primary"
      style={{ backgroundColor: '#ffffff' }}
    >
      <input {...getInputProps()} />
      <FaCloudUploadAlt size={24} className="mr-2 text-primary" />
      <p className="text-primary">Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</p>
    </div>
  );
};

export default ImportDrop;
