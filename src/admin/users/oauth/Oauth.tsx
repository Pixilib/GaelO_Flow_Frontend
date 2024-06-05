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

const Oauth = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const [showOauthForm, setshowOauthForm] = useState(false);

  const { data: oauth2Config, isPending: isLoadingOauthConfig } =
    useCustomQuery<Oauth2Config[]>(["oauth2Config"], () => getOauth2Config());

  const deleteMutation = useCustomMutation(
    ({ name }) => deleteOauth2Config(name),
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
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name} ?`
    );
    if (confirmation) {
      deleteMutation.mutate({ name });
    }
  };

  if (isLoadingOauthConfig) return <Spinner />;

  return (
    <div className="" data-gaelo-flow="oauth">
      <Oauth2Table data={oauth2Config || []} onDelete={handleDeleteOauth} />
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
