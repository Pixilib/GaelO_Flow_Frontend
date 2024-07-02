import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';
import ProgressBar from '../../ui/ProgressBar';

import { sendDicom } from '../../services/instances';
import Model from '../../model/Model';
import { useCustomMutation } from '../../utils';
import { OrthancImportDicom } from '../../utils/types';

type ImportDropProps = {
    onFilesUploaded: (files: File[]) => void;
};

const ImportDrop: React.FC<ImportDropProps> = ({ onFilesUploaded }) => {
    const refModel = useRef<Model>(new Model());

    const [isUploading, setIsUploading] = useState(false);
    const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0);
    const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // State for hover effect

    const { mutateAsync: sendDicomMutate } = useCustomMutation<OrthancImportDicom>(({ data }) =>
        sendDicom(data)
    );

    const promiseFileReader = (file: File) => {
        return new Promise<FileReader>((resolve) => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
            fr.onload = () => {
                resolve(fr);
            };
        });
    };

    const handleFilesDrop = async (acceptedFiles: File[]) => {
        setNumberOfLoadedFiles((loadedFiles) => loadedFiles + acceptedFiles.length);
        setIsUploading(true);

        const uploadedFiles: File[] = [];

        for (const file of acceptedFiles) {
            await promiseFileReader(file).then(async (reader: FileReader) => {
                if (!reader.result) return;

                try {
                    const stringBuffer = new Uint8Array(reader.result as ArrayBuffer);
                    const orthancAnswer = await sendDicomMutate({ data: stringBuffer });
                    refModel.current.addInstance(
                        orthancAnswer.id,
                        orthancAnswer.parentSeries,
                        orthancAnswer.parentStudy,
                        orthancAnswer.parentPatient
                    );
                } catch (e: any) {
                    // Handle errors if needed
                }
            });

            uploadedFiles.push(file);
            setNumberOfProcessedFiles((nbFiles) => nbFiles + 1);
        }

        setIsUploading(false);
        setUploadComplete(true);
        onFilesUploaded(uploadedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFilesDrop,
        onDragEnter: () => setIsHovered(true),
        onDragLeave: () => setIsHovered(false),
    });

    return (
        <div className="flex flex-col items-center mt-4">
            <div
                {...getRootProps({ onClick: () => { } })}
                className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed rounded-lg ${isUploading ? 'cursor-progress' : 'cursor-pointer'
                    } ${isHovered ? 'border-primary' : 'border-transparent'}`}
            >
                {uploadComplete ? (
                    <CheckIcon size={40} className="mb-2 text-success" />
                ) : (
                    <CloudIcon
                        size={40}
                        className={`mb-2 ${isUploading ? 'text-gray-400 animate-spin' : 'text-primary'}`}
                    />
                )}
                <p className="mb-2 text-primary">Drag the Dicom folder or ZIP, or click to select files</p>
                <input {...getInputProps()} />

                {numberOfLoadedFiles > 0 && (
                    <div className="w-full">
                        <ProgressBar progression={uploadComplete ? 100 : Math.round((numberOfProcessedFiles / numberOfLoadedFiles) * 100)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImportDrop;
