import React, { useState } from "react";
import CreateDrop from "./CreateDrop";

const CreateRoot: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const promiseFileReader = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = () => {
                if (typeof fr.result === 'string') {
                    resolve(fr.result);
                } else {
                    reject(new Error("Invalid result type"));
                }
            };
            fr.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleDropFiles = (files: File[]) => {
        setSelectedFiles(files);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <footer className="fixed bottom-0 left-0 w-full p-4 bg-gray-200">
                {/* Vous pouvez ajouter du contenu au footer si nécessaire */}
            </footer>
            <div className="flex flex-col items-center w-full" style={{ marginBottom: "80px" }}>
                <CreateDrop onDrop={handleDropFiles} />
            </div>
        </div>
    );
};

export default CreateRoot;
