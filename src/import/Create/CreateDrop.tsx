import React, { useCallback, useState } from "react";
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';

interface CreateDropProps {
    onDrop: (files: File[]) => void;
}

const CreateDrop: React.FC<CreateDropProps> = ({ onDrop }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const { files } = event.dataTransfer;
            if (files && files.length > 0) {
                setIsUploading(true);

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    try {
                        // Simulate file upload progress
                        await uploadFile(file);
                        setProgress(((i + 1) / files.length) * 100);
                    } catch (error) {
                        console.error("Error uploading file:", error);
                    }
                }

                setIsUploading(false);
                setProgress(0);
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
        return new Promise<void>((resolve, reject) => {
            // Simulate file upload
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
            {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                    <CloudIcon size={40} className="text-primary animate-spin" style={{ transition: 'color 0.3s ease-in-out' }} />
                    <p className="text-primary">Uploading...</p>
                    <div className="w-full bg-gray-200 rounded-lg">
                        <div className="rounded-lg bg-primary" style={{ width: `${progress}%`, height: '8px' }} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-2">
                    <CloudIcon size={40} className="text-primary" style={{ transition: 'color 0.3s ease-in-out' }} />
                    <p className="mt-3 text-primary">Drag and drop files here</p>
                    <input type="file" style={{ display: 'none' }} />
                </div>
            )}
        </div>
    );
};

export default CreateDrop;
