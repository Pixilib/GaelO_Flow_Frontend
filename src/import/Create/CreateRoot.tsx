import React from "react";
import CreateDrop from "./CreateDrop";

const CreateRoot: React.FC = () => {
    const promiseFileReader = (file: File) => {
        return new Promise<FileReader>((resolve) => {
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = () => {
                resolve(fr);
            };
        });
    };

    return (
        <div className="flex flex-col items-center w-full">
            <CreateDrop />
            <CreateForm />
        </div>
    );
};

export default CreateRoot;
