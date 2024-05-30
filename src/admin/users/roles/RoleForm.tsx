import { ChangeEvent, useState, useEffect } from "react";
import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";

import { Role } from "../../../utils/types";
import { Colors } from "../../../utils";

import { Button, Input,Toggle } from "../../../ui";

type RoleFormProps = {
    onSubmit: (payload: Role) => void;
    initialData?: Role;
    buttonText: string;
};

const RoleForm = ({ onSubmit, initialData, buttonText }: RoleFormProps) => {
    const [name, setName] = useState<string>(initialData?.Name || "");
    const [importRole, setImportRole] = useState<boolean>(false);
    const [anonymize, setAnonymize] = useState<boolean>(false);
    const [exportRole, setExportRole] = useState<boolean>(false);
    const [query, setQuery] = useState<boolean>(false);
    const [autoQuery, setAutoQuery] = useState<boolean>(false);
    const [deleteRole, setDeleteRole] = useState<boolean>(false);
    const [admin, setAdmin] = useState<boolean>(false);
    const [modify, setModify] = useState<boolean>(false);
    const [cdBurner, setCdBurner] = useState<boolean>(false);
    const [autoRouting, setAutoRouting] = useState<boolean>(false);
    const [readAll, setReadAll] = useState<boolean>(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.Name);
            setImportRole(initialData.Import);
            setAnonymize(initialData.Anonymize);
            setExportRole(initialData.Export);
            setQuery(initialData.Query);
            setAutoQuery(initialData.AutoQuery);
            setDeleteRole(initialData.Delete);
            setAdmin(initialData.Admin);
            setModify(initialData.Modify);
            setCdBurner(initialData.CdBurner);
            setAutoRouting(initialData.AutoRouting);
            setReadAll(initialData.ReadAll);
        }
    }, [initialData]);

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload: Role = {
            Name: name,
            Import: importRole,
            Anonymize: anonymize,
            Export: exportRole,
            Query: query,
            AutoQuery: autoQuery,
            Delete: deleteRole,
            Admin: admin,
            Modify: modify,
            CdBurner: cdBurner,
            AutoRouting: autoRouting,
            ReadAll: readAll
        };
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} 
        className="grid gap-y-4 lg:gap-y-6"
        data-gaelo-flow="role-form"
        >
            <div className="flex flex-col max-w-lg gap-2">
                <Input
                    placeholder="Role Name"
                    label={"Role Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="grid gap-4 grid-col-1 xl:grid-cols-4">
                <fieldset className="p-3 border border-gray-300 rounded-md">
                    <legend className="px-2 mb-2 text-sm font-semibold">Data Access</legend>
                    <div className="grid items-center gap-2 lg:grid-cols-3 justify-items-center">
                        <Toggle
                            label="Export"
                            labelPosition="top"
                            checked={exportRole}
                            onChange={() => setExportRole(!exportRole)}
                        />
                        <Toggle
                            label="Read All"
                            labelPosition="top"
                            checked={readAll}
                            onChange={() => setReadAll(!readAll)}
                        />
                    </div>
                </fieldset>
                <fieldset className="p-3 border border-gray-300 rounded-md">
                    <legend className="px-2 mb-2 text-sm font-semibold">Query</legend>
                    <div className="grid items-center gap-2 lg:grid-cols-3 justify-items-center">
                        <Toggle
                            label="Auto Query"
                            labelPosition="top"
                            checked={autoQuery}
                            onChange={() => setAutoQuery(!autoQuery)}
                        />
                        <Toggle
                            label="Query"
                            labelPosition="top"
                            checked={query}
                            onChange={() => setQuery(!query)}
                        />
                    </div>
                </fieldset>
                <fieldset className="p-3 border border-gray-300 rounded-md">
                    <legend className="px-2 mb-2 text-sm font-semibold">Modifications</legend>
                    <div className="grid items-center grid-cols-1 gap-2 lg:grid-cols-3 justify-items-center">
                        <Toggle
                            label="Anonymize"
                            labelPosition="top"
                            checked={anonymize}
                            onChange={() => setAnonymize(!anonymize)}
                        />
                        <Toggle
                            label="Delete"
                            labelPosition="top"
                            checked={deleteRole}
                            onChange={() => setDeleteRole(!deleteRole)}
                        />
                        <Toggle
                            label="Import"
                            labelPosition="top"
                            checked={importRole}
                            onChange={() => setImportRole(!importRole)}
                        />
                        <Toggle
                            label="Modify"
                            labelPosition="top"
                            checked={modify}
                            onChange={() => setModify(!modify)}
                        />
                    </div>
                </fieldset>
                <fieldset className="p-3 border border-gray-300 rounded-md">
                    <legend className="px-2 mb-2 text-sm font-semibold">Other</legend>
                    <div className="grid items-start grid-cols-1 gap-2 align-middle lg:grid-cols-3 gap-y-4 justify-items-center">
                        <Toggle
                            label="CD Burner"
                            labelPosition="top"
                            checked={cdBurner}
                            onChange={() => setCdBurner(!cdBurner)}
                        />
                        <Toggle
                            label="Auto Routing"
                            labelPosition="top"
                            checked={autoRouting}
                            onChange={() => setAutoRouting(!autoRouting)}
                        />
                        <Toggle
                            label="Admin"
                            labelPosition="top"
                            checked={admin}
                            onChange={() => setAdmin(!admin)}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="flex justify-center">
                <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                    <SubmitUser size={'1.3rem'} />
                    <div className="">{buttonText}</div>
                </Button>
            </div>
        </form>
    );
};

export default RoleForm;
