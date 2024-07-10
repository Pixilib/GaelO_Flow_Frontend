import { useDropzone } from 'react-dropzone';

type ImportDropProps = {
    onDrop: (files: File[]) => void;
};

const CreateDrop: React.FC<ImportDropProps> = ({ onDrop }) => {

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: onDrop
    });

    return (
        <div className="flex w-full">
            <div
                {...getRootProps({ onClick: open })}
                className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary ${isUploading ? 'cursor-progress' : 'cursor-pointer'
                    } rounded-lg`}
            >

                <p className="mb-2 text-primary">Drop the Dicom folder or ZIP, or click to select files</p>
                <input {...getInputProps()} />


            </div>
        </div>
    );
};

export default CreateDrop;
