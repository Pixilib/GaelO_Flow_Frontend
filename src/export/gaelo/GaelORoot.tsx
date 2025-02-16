import { useState } from "react";
import { Button, Input } from "../../ui";
import { Colors, Study, useCustomMutation, useCustomQuery } from "../../utils";
import { login } from './../../services/gaelo'
import GaelOContextProvider from "./context/GaelOContextProvider";
import GaelOStudyRoleSelector from "./GaelOStudyRoleSelector";
import { getStudy } from "../../services/orthanc";
import GaelOVisitSelector from "./GaelOVisitSelector";

type GaelORootProps = {
    studyOrthancId: string
}
const GaelORoot = ({ studyOrthancId }: GaelORootProps) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [studyName, setStudyName] = useState<string | null>(null)

    const { data: study } = useCustomQuery<Study>(
        ['study', studyOrthancId],
        () => getStudy(studyOrthancId)
    )

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
            role='Investigator'
            token={token}
            study={study}
        >
            {token ?
                <div className="min-h-80">
                    <GaelOStudyRoleSelector onStudychange={handleStudyChange} />
                    <GaelOVisitSelector />
                </div>
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