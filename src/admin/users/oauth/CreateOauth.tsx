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
            className={`rounded-xl w-full bg-gray-200 ${className}`}
            data-galeo-flow="create-oauth"
        >
            <CardHeader color={Colors.success}>
                <div className="flex w-full">
                    <span className="flex items-center justify-center w-4/5 text-lg font-bold">{title}</span>
                    <div className="flex justify-end w-1/5">
                        <CloseButton onClose={() => onClose()} />
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <OauthForm onSubmit={handleSubmit} buttonText="Create" />
            </CardBody>
        </Card>
    );

}
export default CreateOauth;