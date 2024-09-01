import { useState } from "react";

import { getOauth2Config, deleteOauth2Config } from "../../../services/oauth2";
import {
  Oauth2Config,
  useCustomToast,
  useCustomQuery,
  useCustomMutation,
  Colors
} from "../../../utils";

import { Button, Spinner } from "../../../ui";
import Oauth2Table from "./OauthTable";
import CreateOauth from "./CreateOauth";
import { useConfirm } from "../../../services/ConfirmContextProvider";

const Oauth = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [showOauthForm, setshowOauthForm] = useState(false);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);

  const { data: oauth2Config, isPending: isLoadingOauthConfig } =
    useCustomQuery<Oauth2Config[]>(["oauth2Config"], () => getOauth2Config());

  const deleteMutation = useCustomMutation<void, string>(
    (name) => deleteOauth2Config(name),
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

  const deleteOauthHandler = async (provider: Oauth2Config) => {
    const confirmContent = (
      <div className="italic">
        Are you sure you want to delete this provider:
        <span className="text-xl not-italic font-bold text-primary"> {provider.name} ?</span>
      </div>
    );
    if (await confirm({ content: confirmContent })) {
      deleteMutation.mutate(provider.name);
    }
  }

  if (isLoadingOauthConfig) return <Spinner />;
  return (
    <div data-gaelo-flow="oauth" className=" rounded-br-xl rounded-bl-xl">
      <Oauth2Table data={oauth2Config || []} onDelete={deleteOauthHandler} />

      <div className="mt-4">
        {showOauthForm ? (
          <CreateOauth
            title="Create Oauth Provider"
            onClose={() => setshowOauthForm(false)}
          />
        ) : null}
        {!isCreatingProvider ?
          <div className="flex justify-center">
          <Button
            color={Colors.success}
            onClick={() => setIsCreatingProvider(true)}
            className="flex justify-center gap-4 mt-4 mb-4 w-52 hover:successHover"
          >
            Create Provider
          </Button>
          </div>
          :
          <CreateOauth
            title={"Create Oauth Provider"}
            onClose={() => setIsCreatingProvider(false)}
          />
        }
      </div>
    </div>
  );
};
export default Oauth;
