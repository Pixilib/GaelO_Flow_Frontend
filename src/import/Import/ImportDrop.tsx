import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillCloudArrowUpFill as CloudIcon, BsCheckCircleFill as CheckIcon } from 'react-icons/bs';

import { sendDicom } from '../../services/instances';
import Model from '../../model/Model';
import { useCustomMutation } from '../../utils';
import { OrthancImportDicom } from '../../utils/types';
import ProgressBar from '../../ui/ProgressBar';

type ImportDropProps = {
    model: Model;
    onError: (errorMessage: string) => void;
    onFilesUploaded: () => void;
};

const ImportDrop: React.FC<ImportDropProps> = ({ model, onError, onFilesUploaded }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0);
    const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0);

    const uploadComplete = useMemo(() => {
        return numberOfLoadedFiles > 0 && numberOfLoadedFiles === numberOfProcessedFiles;
    }, [numberOfLoadedFiles, numberOfProcessedFiles]);

    const { mutateAsync: sendDicomMutate } = useCustomMutation<OrthancImportDicom>(({ data }) =>
        sendDicom(data)
    );

    const promiseFileReader = (file: File) => {
        return new Promise<FileReader>((resolve) => {
            var fr = new FileReader();
            fr.readAsArrayBuffer(file);
            fr.onload = () => {
                resolve(fr);
            };
        });
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        multiple: true,
        onDrop: async (acceptedFiles) => {
            setNumberOfLoadedFiles((loadedFiles) => loadedFiles + acceptedFiles.length);
            setIsUploading(true);

            for (const file of acceptedFiles) {
                if (!file.name.endsWith('.dcm') && !file.name.endsWith('.zip')) {
                    onError(`Invalid file type for ${file.name}`);
                    continue;
                }

                await promiseFileReader(file).then(async (reader: FileReader) => {
                    if (!reader.result) return;

                    try {
                        const stringBuffer = new Uint8Array(reader.result as ArrayBuffer);
                        const orthancAnswer = await sendDicomMutate({ data: stringBuffer });
                        model.addInstance(
                            orthancAnswer.id,
                            orthancAnswer.parentSeries,
                            orthancAnswer.parentStudy,
                            orthancAnswer.parentPatient
                        );
                    } catch (e: any) {
                        onError(`Error importing ${file.name}: ${e.statusText}`);
                    }
                });
                setNumberOfProcessedFiles((nbFiles) => nbFiles + 1);
            }

            setIsUploading(false);
            onFilesUploaded();
        },
    });

    return (
        <div className="w-full">
            <div
                {...getRootProps({ onClick: open })}
                className={`relative flex flex-col space-y-3 items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 border-4 border-dashed border-primary ${isUploading ? 'cursor-progress' : 'cursor-pointer'
                    } rounded-lg`}
            >
                {uploadComplete ? (
                    <CheckIcon size={40} className="text-success" />
                ) : (
                    <CloudIcon size={40} className={`${isUploading ? 'text-gray-400 animate-spin' : 'text-primary'}`} />
                )}
                <p className="text-primary">Drop the Dicom folder or ZIP, or click to select files</p>
                <input directory="" webkitdirectory="" {...getInputProps()} />
                {numberOfLoadedFiles > 0 &&

                    <ProgressBar progression={(numberOfProcessedFiles / numberOfLoadedFiles) * 100} />}
            </div>
        </div>
    );
};

export default ImportDrop;
