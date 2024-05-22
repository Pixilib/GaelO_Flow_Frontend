import { ChangeEvent, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";

import { postRoles } from "../../services/users";
import { Colors, useCustomMutation, useCustomToast } from "../../utils";
import { RoleUser } from "../../utils/types";
import { Button, Card, CardBody, CardHeader, Input } from "../../ui";
import Toggle from "../../ui/menu/Toogle";

type CreateRoleFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
};

const CreateRoleForm = ({ title, className, onClose }: CreateRoleFormProps) => {
    const [name, setName] = useState<string>("");
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
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: roleMutation } = useCustomMutation<void, RoleUser>(
        (payload) => postRoles(payload),
        [["roles"]],
        {
            onSuccess: () => {
                toastSuccess("Role created successfully");
            },
            onError: (error: any) => {
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user creation.");
                }
            }
        }
    );

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload: RoleUser = {
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
        roleMutation(payload);
    };

    return (
        <Card className={`my-10 rounded-xl ${className}`}>
            <CardHeader title={title} color={Colors.success}>
                <IoIosCloseCircle
                    size={"1.7rem"}
                    onClick={() => onClose()}
                    className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
                />
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit} className="grid gap-y-4 lg:gap-y-6">
                    {/* Section pour le nom du rôle */}
                    <div className="flex flex-col max-w-lg gap-2">
                        <Input
                            placeholder="Role Name"
                            label={"Role Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Grille principale des fieldsets */}
                    <div className="grid gap-4 grid-col-1 md:grid-cols-4">
                        {/* Fieldset pour Import/Export/Delete */}
                        <fieldset className="p-3 border border-gray-300 rounded-md">
                            <legend className="px-2 mb-2 text-sm font-semibold">Data Access</legend>
                            <div className="grid items-center grid-cols-3 gap-2 justify-items-center">
                                <Toggle
                                    label="Export"
                                    labelPosition="top"
                                    onChange={() => setExportRole(!exportRole)}
                                />
                                <Toggle
                                    label="Read All"
                                    labelPosition="top"
                                    onChange={() => setReadAll(!readAll)}
                                />

                            </div>

                        </fieldset>

                        <fieldset className="p-3 border border-gray-300 rounded-md">
                            <legend className="px-2 mb-2 text-sm font-semibold">Query</legend>
                            <div className="grid items-center grid-cols-3 gap-2 justify-items-center">
                                <Toggle
                                    label="Auto Query"
                                    labelPosition="top"
                                    onChange={() => setAutoQuery(!autoQuery)}
                                />
                                <Toggle
                                    label="Query"
                                    labelPosition="top"
                                    onChange={() => setQuery(!query)}
                                />
                            </div>

                        </fieldset>

                        <fieldset className="p-3 border border-gray-300 rounded-md">
                            <legend className="px-2 mb-2 text-sm font-semibold">Modifications </legend>
                            <div className="grid items-center grid-cols-3 gap-2 justify-items-center">
                                <Toggle
                                    label="Anonymize"
                                    labelPosition="top"
                                    onChange={() => setAnonymize(!anonymize)}
                                />
                                <Toggle
                                    label="Delete"
                                    labelPosition="top"
                                    onChange={() => setDeleteRole(!deleteRole)}
                                />
                                <Toggle
                                    label="Import"
                                    labelPosition="top"
                                    onChange={() => setImportRole(!importRole)}
                                />
                                <Toggle
                                    label="Modify"
                                    labelPosition="top"
                                    onChange={() => setModify(!modify)}
                                />
                            </div>


                        </fieldset>
                        {/* Fieldset pour Autres Permissions à droite */}
                        <fieldset className="p-3 border border-gray-300 rounded-md">
                            <legend className="px-2 mb-2 text-sm font-semibold">Other</legend>
                            <div className="grid items-start grid-cols-3 gap-2 align-middle gap-y-4 justify-items-center">
                                <Toggle
                                    label="CD Burner"
                                    labelPosition="top"
                                    onChange={() => setCdBurner(!cdBurner)}
                                />
                                <Toggle
                                    label="Auto Routing"
                                    labelPosition="top"
                                    onChange={() => setAutoRouting(!autoRouting)}
                                />
                                <Toggle
                                    label="Admin"
                                    labelPosition="top"
                                    onChange={() => setAdmin(!admin)}
                                />
                            </div>
                        </fieldset>
                    </div>
                    {/* Bouton de Soumission */}
                    <div className="flex justify-center">
                        <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                            <SubmitUser size={'1.3rem'} />
                            <div className="">Submit</div>
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default CreateRoleForm;
