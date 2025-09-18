import { store } from "../store"
import { useTranslation } from "react-i18next";

type OhifViewerLinkProps = {
    studyInstanceUID: string
}
const OhifViewerLink = ({ studyInstanceUID }: OhifViewerLinkProps) => {
    const token = store?.getState()?.user.token
    const {t} = useTranslation()
    return (
        <a href={'/viewer-ohif/gaelo?StudyInstanceUIDs=' + studyInstanceUID + '&token=' + token} target='_blank'>{t("contents.View in OHIF")}</a>
    )

}

export default OhifViewerLink