import { useState } from "react";
import { getOauth2Config, deleteOauth2Config } from "../../../services/oauth2";
import {
  Oauth2Config,
  useCustomToast,
  useCustomQuery,
  useCustomMutation,
  Colors,
} from "../../../utils";
import { Button, Spinner, CardFooter } from "../../../ui";
import Oauth2Table from "./OauthTable";
import CreateOauth from "./CreateOauth";
import { useConfirm } from "../../../services/ConfirmContextProvider";
import { More } from "../../../icons";

const Oauth = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [showOauthForm, setShowOauthForm] = useState(false);

  const { data: oauth2Config, isPending: isLoadingOauthConfig } =
    useCustomQuery<Oauth2Config[]>(["oauth2Config"], () => getOauth2Config());

  const deleteMutation = useCustomMutation<void, string>(
    (name) => deleteOauth2Config(name),
    [["oauth2Config"]],
    {
      onSuccess: () => {
        toastSuccess("Oauth2 config deleted successfully");
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
  };

  if (isLoadingOauthConfig) return <Spinner />;

  return (
    <div data-gaelo-flow="oauth" className="rounded-br-xl rounded-bl-xl">
      <Oauth2Table
        data={oauth2Config || []} onDelete={deleteOauthHandler} />

      <CardFooter
        className="border-t rounded-b-lg bg-light">
        <div className="flex justify-center w-full">
          {!showOauthForm ? (
            <Button
              color={Colors.success}
              onClick={() => setShowOauthForm(true)}
              className="flex justify-center gap-4 mt-4 mb-4 w-52 hover:successHover"
            >
              <More size={18} />
              Create Provider
            </Button>
          ) : (
            <CreateOauth
              title="Create Oauth Provider"
              onClose={() => setShowOauthForm(false)}
            />
          )}
        </div>
      </CardFooter>
    </div>
  );
};

export default Oauth;
