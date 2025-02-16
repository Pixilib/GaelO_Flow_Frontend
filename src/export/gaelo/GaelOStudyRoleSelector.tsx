import { useContext, useEffect, useState } from "react"
import GaelOContext from "./context/GaelOContext"
import { useCustomQuery } from "../../utils"
import { getRoles, getStudiesFromUser } from "../../services/gaelo"
import { SelectInput, Spinner } from "../../ui"

type GaelOStudyRoleSelector = {
    onStudychange: (studyName: string) => void
}
const GaelOStudyRoleSelector = ({ onStudychange }: GaelOStudyRoleSelector) => {

    const { token, userId } = useContext(GaelOContext)
    const [studyName, setStudyName] = useState<string | null>(null)

    const { data: studiesOptions, isPending } = useCustomQuery(
        ['gaelo', 'studies', userId],
        () => getStudiesFromUser(token, userId),
        {
            select: (data) => {
                return data.map(study => ({ label: study, value: study }))
            }
        }
    )

    const { data: isInvestigator } = useCustomQuery(
        ['gaelo', 'studies', userId, studyName, 'roles'],
        () => getRoles(token, userId, studyName),
        {
            enabled: studyName !== null,
            select: (roles) => {
                return roles.includes('Investigator')
            }
        }
    )

    useEffect(() => {
        if (isInvestigator) onStudychange(studyName)
    }, [isInvestigator])

    if (isPending) return <Spinner />

    return (
        <div>
            <SelectInput onChange={(option) => setStudyName(option.value)} value={studiesOptions.find(option => studyName === option.value)?.value ?? null} options={studiesOptions} />
        </div>
    )

}

export default GaelOStudyRoleSelector