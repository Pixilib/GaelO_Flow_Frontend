import React, { useCallback, useState } from "react";
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';
import { ProgressBar } from '../../ui';
import { useDropzone } from "react-dropzone";

interface CreateDropProps {
    onDrop: (files: File[]) => void;
}

const CreateDrop: React.FC<CreateDropProps> = ({ onDrop }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0);
    const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0);

    const uploadComplete = numberOfLoadedFiles > 0 && numberOfLoadedFiles === numberOfProcessedFiles;

    const { getRootProps, open } = useDropzone({
        multiple: true,
        onDrop: async (files : File[]) => {
            
            if (files && files.length > 0) {
                setNumberOfLoadedFiles(files.length);
                setIsUploading(true);
                setNumberOfProcessedFiles(0);

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    try {
                        await convertToDicom(file);
                        setNumberOfProcessedFiles((prev) => prev + 1);
                    } catch (error) {
                        console.error("Error processing file:", error);
                    }
                }

                setIsUploading(false);
                onDrop(Array.from(files));
            }
        },
    });

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    const convertToDicom = async (file: File) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log(`Converted ${file.name} to DICOM`);
                resolve();
            }, 1000);
        });
    };

    return (
        <div
            className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary rounded-lg cursor-pointer ${isUploading ? 'cursor-progress' : 'cursor-pointer'}`}
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
                    className={`${isUploading ? 'text-gray-400 animate-spin' : 'text-primary'}`} />
            )}
            <p className="text-primary">{uploadComplete ? numberOfLoadedFiles + ' files loaded' : 'Drag and drop files here'}</p>
            <input type="file" style={{ display: 'none' }} />
            {numberOfLoadedFiles > 0 && (
                <ProgressBar
                    progression={Math.round((numberOfProcessedFiles / numberOfLoadedFiles) * 100)} />
            )}
        </div>
    );
};

export default CreateDrop;
