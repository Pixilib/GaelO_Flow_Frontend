import React from "react";
import { useDropzone } from "react-dropzone";
import { useCustomToast } from "../../utils";
import { Check, Cloud } from "../../icons";
import { useTranslation } from "react-i18next";

interface CreateDropProps {
    files: File[],
    onDrop: (files: File[]) => void;
}

const CreateDrop: React.FC<CreateDropProps> = ({ files, onDrop }) => {

    const { toastError } = useCustomToast()
    const {t} = useTranslation()

    const { getRootProps, open } = useDropzone({
        multiple: true,
        onDrop: async (files: File[]) => {
            if (files && files.length > 0) {
                onDrop(files);
            }
        },
        onDropRejected: (_fileRejection: any) => {
            toastError("File format rejected (accepts png, jpeg or pdf)")
        },
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'application/pdf': []
        }
    });

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return (
        <div
            className={`relative flex flex-col items-center justify-center w-full max-w-full p-4 text-center bg-indigo-100 dark:bg-neutral-800  border-4 border-dashed dark:border-white border-primary rounded-lg cursor-pointer`}
            {...getRootProps({ onClick: open })}
            onDragOver={handleDragOver}
        >
            {files.length > 0 ? (
                <Check
                    size={40}
                    className="text-success dark:text-emerald-600" />
            ) : (
                <Cloud
                    size={40}
                    className={`text-primary dark:text-white`} />
            )}
            <p className="text-primary dark:text-white">{files.length > 0 ? files.length + ' files loaded' : t("import.drag-and-drop")} </p>
            <input type="file" style={{ display: 'none' }} />
        </div>
    );
};

export default CreateDrop;
