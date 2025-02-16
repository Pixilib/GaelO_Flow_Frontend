import { useState } from "react";
import { Button, Input } from "../../ui";
import { Colors, useCustomMutation } from "../../utils";
import { login } from './../../services/gaelo'
import GaelOContextProvider from "./context/GaelOContextProvider";
import GaelOStudyRoleSelector from "./GaelOStudyRoleSelector";

const GaelORoot = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [studyName, setStudyName] = useState<string | null>(null)

    const { mutate: loginMutation } = useCustomMutation(
        ({ email, password }) => login(email, password),
        [['gaelo', 'login']],
        {
            onSuccess: (data) => {
                console.log(data)
                setToken(data.access_token)
                setUserId(data.id)
            }
        }
    )

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginMutation({ email, password })
    }

    const handleStudyChange = (studyName) => {
        setStudyName(studyName)
    }

    return (
        <GaelOContextProvider
            studyName={studyName}
            userId={userId}
            role='investigator'
            token={token}
        >
            {token ?
                <GaelOStudyRoleSelector onStudychange={handleStudyChange} />
                :
                <div>
                    <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                        <Input name="gaeloEmail" required autoComplete="email" label={"Email"} value={email} onChange={(event) => setEmail(event.target.value)} />
                        <Input name="gaeloPassword" required autoComplete="current-password" label={"Password"} value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
                        <Button color={Colors.primary} type="submit">Login</Button>
                    </form>
                </div>
            }
        </GaelOContextProvider>
    )
}

export default GaelORoot;