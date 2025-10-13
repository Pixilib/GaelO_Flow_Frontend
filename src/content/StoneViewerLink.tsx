import { store } from "../store"
import { useTranslation } from "react-i18next";

type StoneViewerLinkProps = {
    studyInstanceUID: string
}
const StoneViewerLink = ({ studyInstanceUID }: StoneViewerLinkProps) => {
    const token = store?.getState()?.user.token
    const {t} = useTranslation()
    return (
        <a href={'/viewer-stone/index.html?study=' + studyInstanceUID + '&token=' + token} className="w-full" target='_blank'>{t("contents.view-in-stone")}</a>
    )

}

export default StoneViewerLink