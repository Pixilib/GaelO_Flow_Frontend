import React, { useCallback, useState } from "react";
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';

interface CreateDropProps {
    onDrop: (files: File[]) => void;
}

const CreateDrop: React.FC<CreateDropProps> = ({ onDrop }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const { files } = event.dataTransfer;
            if (files && files.length > 0) {
                setIsUploading(true);
                setProgress(0);

                let successfulUploads = 0;
                let failedUploads = 0;

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    try {
                        await uploadFile(file);
                        successfulUploads++;
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        failedUploads++;
                    } finally {
                        const currentProgress = ((successfulUploads + failedUploads) / files.length) * 100;
                        setProgress(currentProgress);
                    }
                }

                setIsUploading(false);
                setUploadComplete(true);
                onDrop(Array.from(files));
            }
        },
        [onDrop]
    );

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    const uploadFile = async (file: File) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log(`Uploaded: ${file.name}`);
                resolve();
            }, 1000);
        });
    };

    return (
        <div
            className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary rounded-lg cursor-pointer ${isUploading ? 'cursor-progress' : 'cursor-pointer'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {uploadComplete ? (
                <CheckIcon size={40} className="text-success" />
            ) : (
                <CloudIcon size={40} className={`${isUploading ? 'text-gray-400 animate-spin' : 'text-primary'}`} />
            )}
            <p className="text-primary">{uploadComplete ? 'Upload Complete!' : 'Drag and drop files here'}</p>
            <input type="file" style={{ display: 'none' }} />
            {isUploading && (
                <div className="w-full bg-gray-200 rounded-lg">
                    <div className="rounded-lg bg-primary" style={{ width: `${progress}%`, height: '8px' }} />
                </div>
            )}
        </div>
    );
};

export default CreateDrop;
