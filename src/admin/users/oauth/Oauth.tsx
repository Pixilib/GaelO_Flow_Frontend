import { useState } from "react";
import { BsPersonPlusFill as RoleCreate } from "react-icons/bs";

import { getOauth2Config, deleteOauth2Config } from "../../../services/oauth2";
import {
  Oauth2Config,
  useCustomToast,
  useCustomQuery,
  useCustomMutation,
  Colors,
} from "../../../utils";

import { Button, Spinner } from "../../../ui";
import Oauth2Table from "./OauthTable";
import CreateOauth from "./CreateOauth";
import { useConfirm } from "../../../services/ConfirmContextProvider";

const Oauth = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [showOauthForm, setshowOauthForm] = useState(false);

  const { data: oauth2Config, isPending: isLoadingOauthConfig } =
    useCustomQuery<Oauth2Config[]>(["oauth2Config"], () => getOauth2Config());

  const deleteMutation = useCustomMutation<void,string>(
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
      <span className="text-xl not-italic font-bold text-primary"> {provider.Name} ?</span> 
    </div>
    );
    if(await confirm({ content: confirmContent })) {
      deleteMutation.mutate(provider.Name);
    }
  }
  
  if (isLoadingOauthConfig) return <Spinner />;
  return (
    <div data-gaelo-flow="oauth">
      <Oauth2Table data={oauth2Config || []} onDelete={deleteOauthHandler} />
      <div className="flex justify-center mx-10">
        {showOauthForm === false && (
          <Button
            color={Colors.success}
            onClick={() => setshowOauthForm(true)}
            className="flex justify-center gap-4 my-10 w-52 h-11 hover:successHover "
          >
            <RoleCreate size={"1.3rem"} />
            Create Provider
          </Button>
        )}
      </div>
      <div className="mt-4">
        {showOauthForm ? (
          <CreateOauth
            title="Create Oauth Provider"
            onClose={() => setshowOauthForm(false)}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Oauth;
