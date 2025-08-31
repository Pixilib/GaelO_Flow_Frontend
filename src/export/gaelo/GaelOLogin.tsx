import { useState } from "react";
import { Button, Input } from "../../ui";
import { Colors, useCustomMutation } from "../../utils";
import { login } from "../../services/gaelo";

type GaelOLoginProps = {
    handleTokenChange: (token: string) => void;
    handleUserIdChange: (userId: number) => void;
}

const GaelOLogin = ({
    handleTokenChange,
    handleUserIdChange
}: GaelOLoginProps) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState<string | null>(null)

    const { mutate: loginMutation } = useCustomMutation(
        ({ email, password }) => login(email, password),
        [['gaelo', 'login']],
        {
            onSuccess: (data) => {
                handleTokenChange(data.access_token)
                handleUserIdChange(data.id)
            },
            onError: () => {
                setLoginError('Login Failure')
            }
        }
    )

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginMutation({ email, password })
    }

    return (
        <div className="flex flex-col gap-3">
            <form autoComplete="on" className="flex flex-col gap-3" onSubmit={handleLogin}>
                <Input id="gaeloEmail" name="gaeloEmail" required autoComplete="email" label={"Email"} value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input id="gaeloPassword" name="gaeloPassword" required autoComplete="current-password" label={"Password"} value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
                {
                    loginError && (
                        <div className="bg-warning rounded-xl text-white p-3">
                            Login Error
                        </div>
                    )
                }
                <Button color={Colors.primary} type="submit">Login</Button>
            </form>
        </div>
    )
}

export default GaelOLogin;