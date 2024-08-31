import React, { useCallback, useState } from "react";
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';
import { ProgressBar } from '../../ui';
import { useDropzone } from "react-dropzone";
import { useCustomToast } from "../../utils";

interface CreateDropProps {
    onDrop: (files: File[]) => void;
}

const CreateDrop: React.FC<CreateDropProps> = ({ onDrop }) => {

    const {toastError} = useCustomToast()
    const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0);
    const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0);

    const uploadComplete = numberOfLoadedFiles > 0 && numberOfLoadedFiles === numberOfProcessedFiles;

    const { getRootProps, open } = useDropzone({
        multiple: true,
        onDrop: async (files : File[]) => {
            if (files && files.length > 0) {
                setNumberOfLoadedFiles(files.length);
                setNumberOfProcessedFiles(files.length);
                onDrop(files);
            }
        },
        onDropRejected : (_fileRejection :any)=>{
            toastError("File format rejected (accepts png, jpeg or pdf)")
        },
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'application/pdf' : []
          }
    });

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    return (
        <div
            className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary rounded-lg cursor-pointer`}
            {...getRootProps({ onClick: open })}
            onDragOver={handleDragOver}
        >
            {uploadComplete ? (
                <CheckIcon
                    size={40}
                    className="text-success" />
            ) : (
                <CloudIcon
                    size={40}
                    className={`text-primary`} />
            )}
            <p className="text-primary">{uploadComplete ? numberOfLoadedFiles + ' files loaded' : 'Drag and drop image files here'}</p>
            <input type="file" style={{ display: 'none' }} />
            {numberOfLoadedFiles > 0 && (
                <ProgressBar
                    progression={Math.round((numberOfProcessedFiles / numberOfLoadedFiles) * 100)} />
            )}
        </div>
    );
};

export default CreateDrop;
