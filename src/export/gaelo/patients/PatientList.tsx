import React, { useMemo, useState } from "react";

type PatientListProps = {
    patients: any[];
    patientId: string,
    onRowClick: (patientId: string) => void;
};

const PatientList: React.FC<PatientListProps> = ({
    patients,
    patientId,
    onRowClick
}) => {
    const [search, setSearch] = useState("");

    const handleRowClick = (id: string) => {
        if (patientId === id)
            onRowClick(null);
        else
            onRowClick(id);
    }

    const handleSearchPatients = (search: string) => {
        setSearch(search);
    }

    const filteredPatients = useMemo(
        () =>
            patients.filter(
                (patient) =>
                    (patient.code + " " + patient.center.name)
                        .toLowerCase()
                        .includes(search.toLowerCase())
            ),
        [patients, search]
    );

    return (
        <div className="flex flex-col w-110 gap-2">
            <input
                placeholder="Search patients..."
                className="w-96/100 h-7 px-3 border border-gray-300 rounded-xl"
                type="text"
                onChange={(e) => handleSearchPatients(e.target.value)}
            />
            <div className="flex flex-col h-75 overflow-y-auto text-gray-800">
                {filteredPatients.map((patient) => (
                    <div className="flex flex-col justify-center" key={patient.id}>
                        <div className={`flex flex-col h-12`}>
                            <button
                                className="flex flex-row items-center text-base cursor-pointer hover:bg-gray-200 w-full h-12 justify-between pr-2"
                                onClick={() => handleRowClick(patient.id)}
                            >
                                <p className={patientId === patient.id ? "font-bold" : ""}>{patient.code}</p>
                                <p className={patientId === patient.id ? "font-bold" : ""}>{patient.center.name}</p>
                            </button>
                        </div>
                        <div className="border-b border-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
