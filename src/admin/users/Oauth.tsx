import { useState } from "react";
import { BsPersonPlusFill as RoleCreate } from "react-icons/bs";
import { getOauth2Config, deleteOauth2Config } from "../../services/oauth2";
import { useCustomQuery } from "../../utils/reactQuery";
import { Oauth2Config, useCustomToast, useCustomMutation, Colors } from "../../utils";
import { Button, Spinner } from "../../ui";
import Oauth2Table from "./OauthTable";
import CreateOauth from "./CreateOauth";


const Oauth = () => {
    const [showOauth2Form, setShowOauth2Form] = useState<'create'| null>(null);
    const { toastSuccess, toastError } = useCustomToast();


    const { data: oauth2Config, isPending: isLoadingOauth2Config } = useCustomQuery<Oauth2Config[]>(
        ["oauth2Config"],
        () => getOauth2Config(),
        {
            enabled: true,
        }
    );

    const deleteMutation = useCustomMutation<void, string>(
        (name: string) => deleteOauth2Config(name),
        [["oauth2Config"]],
        {
            onSuccess: () => {
                toastSuccess("Oauth2 config deleted with success");
            },
            onError: () => {
                toastError("Oauth2 config deletion failed");
            },
        }
    );


    //TODO : Replace with modal confirmation when is implemented
    const handleDeleteOauth = (name: string) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${name} ?`);
        if (confirmation) {
            deleteMutation.mutate(name);
        }
    }


    return (
        <div className="">
            {
                isLoadingOauth2Config ? (
                    <Spinner />
                ) : (
                    <Oauth2Table
                        data={oauth2Config || []}
                        onDelete={handleDeleteOauth}
                    />
                )
            }
            <div className="flex justify-center mx-10">
                    <Button
                        color={Colors.success}
                        onClick={() => setShowOauth2Form('create')}
                        className="flex justify-center gap-4 my-10 w-52 h-11 hover:successHover "
                    >
                        <RoleCreate size={'1.3rem'} />
                        Create Provider
                    </Button>
            </div>
                <div>
                    {showOauth2Form === 'create' &&
                    <CreateOauth
                        title="Create Oauth Provider"
                        onClose={() => setShowOauth2Form(null)}
                    />
                    }
                </div>
        </div>
    )
}
export default Oauth;


