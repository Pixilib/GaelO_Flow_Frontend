import { useState } from "react";
import { Study, useCustomQuery } from "../../utils";
import GaelOContextProvider from "./context/GaelOContextProvider";
import GaelOStudyRoleSelector from "./GaelOStudyRoleSelector";
import GaelOVisitSelector from "./visits/GaelOVisitSelector";
import { getStudy } from "../../services/orthanc";
import GaelOLogin from "./GaelOLogin";
import GaelOVisit from "./visits/GaelOVisit";

type GaelORootProps = {
    studyOrthancId: string
}
const GaelORoot = ({ studyOrthancId }: GaelORootProps) => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [studyName, setStudyName] = useState<string | null>(null)
    const [visitId, setVisitId] = useState<string | null>(null);

    const { data: study } = useCustomQuery<Study>(
        ['study', studyOrthancId],
        () => getStudy(studyOrthancId)
    )

    const handleTokenChange = (token: string) => {
        setToken(token);
    }

    const handleUserIdChange = (userId: number) => {
        setUserId(userId);
    }

    const handleStudyChange = (studyName) => {
        setStudyName(studyName)
    }

    const handleVisitId = (visitId: string) => {
        setVisitId(visitId);
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
                    <h1 className="font-bold text-dark text-l dark:text-white" >Study :</h1>
                    <GaelOStudyRoleSelector onStudychange={handleStudyChange} />
                    <GaelOVisitSelector
                        studyMainDicomTag={study.mainDicomTags}
                        onVisitIdChange={handleVisitId}
                    />
                    {visitId &&
                        <GaelOVisit
                            studyOrthancId={studyOrthancId}
                            visitId={visitId}
                        />
                    }
                </div>
                :
                <GaelOLogin
                    handleTokenChange={handleTokenChange}
                    handleUserIdChange={handleUserIdChange}
                />
            }
        </GaelOContextProvider>
    )
}

export default GaelORoot;