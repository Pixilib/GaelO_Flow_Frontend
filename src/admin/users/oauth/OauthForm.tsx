import { ChangeEvent, useEffect, useState } from "react";

import { Colors, Oauth2Config } from "../../../utils";
import { Button, Input } from "../../../ui";
import { SubmitUser } from "../../../icons";

type OauthFormProps = {
  onSubmit: (payload: Oauth2Config) => void;
  initialData?: Oauth2Config;
  buttonText: string;
};

const OauthForm = ({ onSubmit, initialData, buttonText }: OauthFormProps) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [provider, setProvider] = useState<string>(initialData?.provider || "");
  const [authorizationUrl, setAuthorizationUrl] = useState<string>(
    initialData?.authorizationUrl || ""
  );
  const [clientId, setClientId] = useState<string>(initialData?.clientId || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setProvider(initialData.provider);
      setAuthorizationUrl(initialData.authorizationUrl);
      setClientId(initialData.clientId);
    }
  }, [initialData]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Oauth2Config = {
      name: name,
      provider: provider,
      authorizationUrl: authorizationUrl,
      clientId: clientId,
    };

    onSubmit(payload);
    setName("");
    setProvider("");
    setAuthorizationUrl("");
    setClientId("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-4 lg:gap-y-6">
      <div className="grid grid-cols-2 gap-x-4">
        <Input
          placeholder="name"
          label={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Provider"
          label={"Provider"}
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <Input
          placeholder="Authorization Url"
          label={"Authorization Url"}
          value={authorizationUrl}
          onChange={(e) => setAuthorizationUrl(e.target.value)}
          required
        />
        <Input
          placeholder="Client Id"
          label={"Client Id"}
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button
          color={Colors.success}
          className="h-12 gap-3 justify-self-center w-36 md:justify-center"
          type="submit"
        >
          <SubmitUser size="1.3rem" />
          <div className="">{buttonText}</div>
        </Button>
      </div>
    </form>
  );
};
export default OauthForm;
