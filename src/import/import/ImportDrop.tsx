import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import { ProgressBar } from '../../ui';

import { sendDicom, sendZipDicom } from '../../services/instances';
import Model from '../../model/Model';
import { useCustomMutation } from '../../utils';
import { OrthancImportDicom } from '../../utils/types';
import { Check, Cloud } from '../../icons';


type ImportDropProps = {
    model: Model;
    onError: (filename: string, errorMessage: string) => void;
    onFilesUploaded: () => void;
};

const ImportDrop: React.FC<ImportDropProps> = ({ model, onError, onFilesUploaded }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [numberOfLoadedFiles, setNumberOfLoadedFiles] = useState(0);
    const [numberOfProcessedFiles, setNumberOfProcessedFiles] = useState(0);

    const uploadComplete = useMemo(() => {
        return numberOfLoadedFiles > 0 && numberOfLoadedFiles === numberOfProcessedFiles;
    }, [numberOfLoadedFiles, numberOfProcessedFiles]);

    const { mutateAsync: sendDicomMutate } = useCustomMutation<OrthancImportDicom | OrthancImportDicom[]>(({ data, isZip }) => {
        if (isZip)
            return sendZipDicom(data);
        else
            return sendDicom(data);
    });

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
                const isZip = file.type === 'application/zip';

                await promiseFileReader(file).then(async (reader: FileReader) => {
                    if (!reader.result) return;

                    try {
                        const stringBuffer = new Uint8Array(reader.result as ArrayBuffer);
                        const orthancAnswer = await sendDicomMutate({ data: stringBuffer, isZip });
                        if (isZip) {
                            const orthancAnswers = orthancAnswer as OrthancImportDicom[];
                            for (const answer of orthancAnswers) {
                                await model.addInstance(
                                    answer.id,
                                    answer.parentSeries,
                                    answer.parentStudy,
                                    answer.parentPatient
                                );
                            }
                        } else {
                            await model.addInstance(
                                orthancAnswer.id,
                                orthancAnswer.parentSeries,
                                orthancAnswer.parentStudy,
                                orthancAnswer.parentPatient
                            );
                        }
                        onFilesUploaded();
                    } catch (e: any) {
                        onError(file.name, e.status === 400 ? "Not a DICOM file" : e.statusText);
                    }
                });
                setNumberOfProcessedFiles((nbFiles) => nbFiles + 1);
            }
            setIsUploading(false);
        },
    });

    return (
        <div className='w-full p-6'>
            <div
                {...getRootProps({ onClick: open })}
                className={`relative flex flex-col space-y-3 items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 dark:bg-neutral-800 border-4 border-dashed border-primary dark:border-white ${isUploading ? 'cursor-progress' : 'cursor-pointer'
                    } rounded-lg`}
            >
                {uploadComplete ? (
                    <Check
                        size={40}
                        className="text-success dark:text-emerald-600" />
                ) : (
                    <Cloud
                        size={40}
                        className={`${isUploading ? 'text-gray-400 animate-spin' : 'text-primary dark:text-white'}`} />
                )}
                <p className="text-primary dark:text-white">Drop the Dicom folder or ZIP, or click to select files</p>
                <input directory="" webkitdirectory="" {...getInputProps()} />
                {numberOfLoadedFiles > 0 &&
                    <ProgressBar
                        progress={Math.round(numberOfProcessedFiles / numberOfLoadedFiles * 100)} />}
            </div>
        </div>
    );
};

export default ImportDrop;
