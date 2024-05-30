import { ChangeEvent, useEffect, useState } from 'react';
import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";

import { Colors, Oauth2Config } from '../../utils';
import { Button, Input } from '../../ui';



type OauthFormProps = {
    onSubmit: (payload: Oauth2Config) => void;
    initialData?: Oauth2Config;
    buttonText: string;
};

const OauthForm = ({ onSubmit, initialData, buttonText }: OauthFormProps) => {
    const [name, setName] = useState<string>(initialData?.Name || "");
    const [provider, setProvider] = useState<string>(initialData?.Provider || "");
    const [authorizationUrl, setAuthorizationUrl] = useState<string>(initialData?.AuthorizationUrl || "");
    const [clientId, setClientId] = useState<string>(initialData?.ClientId || "");

    useEffect(() => {
        if (initialData) {
            setName(initialData.Name);
            setProvider(initialData.Provider);
            setAuthorizationUrl(initialData.AuthorizationUrl);
            setClientId(initialData.ClientId);
        }
    }
        , [initialData]);

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload: Oauth2Config = {
            Name: name,
            Provider: provider,
            AuthorizationUrl: authorizationUrl,
            ClientId: clientId
        };
        onSubmit(payload);

        setName("");
        setProvider("");
        setAuthorizationUrl("");
        setClientId("");
    }


    return (
        <form onSubmit={handleSubmit} className='grid gap-y-4 lg:gap-y-6'>
            <div className="grid grid-cols-2 gap-x-4">
                <Input
                    placeholder='name'
                    label={'Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    placeholder='Provider'
                    label={'Provider'}
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <Input
                    placeholder='Authorization Url'
                    label={'Authorization Url'}
                    value={authorizationUrl}
                    onChange={(e) => setAuthorizationUrl(e.target.value)}
                    required
                />
                <Input
                    placeholder='Client Id'
                    label={'Client Id'}
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-center">
                <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                    <SubmitUser size={'1.3rem'} />
                    <div className="">{buttonText}</div>
                </Button>
            </div>
        </form>
    )
}
export default OauthForm;