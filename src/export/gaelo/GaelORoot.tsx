import { useState } from "react";
import { Button, Input, Label } from "../../ui";
import { Colors, Study, useCustomMutation, useCustomQuery } from "../../utils";

import GaelOContextProvider from "./context/GaelOContextProvider";
import GaelOStudyRoleSelector from "./GaelOStudyRoleSelector";
import GaelOVisitSelector from "./GaelOVisitSelector";

import { getStudy } from "../../services/orthanc";
import { login } from './../../services/gaelo'
import { data } from "react-router";

type GaelORootProps = {
    studyOrthancId: string
}
const GaelORoot = ({ studyOrthancId }: GaelORootProps) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [studyName, setStudyName] = useState<string | null>(null)
    const [loginError, setLoginError] = useState<string | null>(null)

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
                <div className="min-h-80 flex flex-col gap-3">
                    <h1 className="font-bold text-dark text-l" >Study :</h1>
                    <GaelOStudyRoleSelector onStudychange={handleStudyChange} />
                    <GaelOVisitSelector studyOrthancId={studyOrthancId} studyMainDicomTag={study.mainDicomTags} />
                </div>
                :
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
            }
        </GaelOContextProvider>
    )
}

export default GaelORoot;