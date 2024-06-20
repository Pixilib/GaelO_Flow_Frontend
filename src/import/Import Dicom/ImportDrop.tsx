import { useDropzone } from 'react-dropzone';

const ImportDrop = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    }
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Glissez et déposez les fichiers ici, ou cliquez pour sélectionner des fichiers</p>
    </div>
  );
};

export default ImportDrop;