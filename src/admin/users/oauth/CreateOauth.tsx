import { postOauth2Config } from "../../../services/oauth2";
import { Colors, Oauth2Config, useCustomMutation, useCustomToast } from "../../../utils";
import { Card, CardHeader, CardBody, CloseButton } from "../../../ui";
import OauthForm from "./OauthForm";

type CreateOauthProps = {
    title: string;
    className?: string;
    onClose: () => void;
};

const CreateOauth = ({ title, className, onClose }: CreateOauthProps) => {
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: oauthMutation } = useCustomMutation<void, Oauth2Config>(
        (payload) => postOauth2Config(payload),
        [["oauth2Config"]],
        {
            onSuccess: () => {
                toastSuccess("Oauth2 config created successfully");
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

    const handleSubmit = (payload: Oauth2Config) => {
        oauthMutation(payload);
    };
    
    return (

        <Card 
        className={`my-12 rounded-xl bg-light-gray ${className}`}
        data-galeo-flow="create-oauth"
        >
            <CardHeader title={title} color={Colors.success}>
            <CloseButton onClose={() => onClose()} />
            </CardHeader>
            <CardBody>
                <OauthForm onSubmit={handleSubmit} buttonText="Create" />
            </CardBody>
        </Card>      
    );

}
export default CreateOauth;