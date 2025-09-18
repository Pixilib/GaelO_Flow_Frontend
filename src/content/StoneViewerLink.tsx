import { store } from "../store"
import { useTranslation } from "react-i18next";

type StoneViewerLinkProps = {
    studyInstanceUID: string
}
const StoneViewerLink = ({ studyInstanceUID }: StoneViewerLinkProps) => {
    const token = store?.getState()?.user
    const {t} = useTranslation()
    return (
        <a href={'/viewer-stone/index.html?study=' + studyInstanceUID + '&token=' + token} className="w-full" target='_blank'>{t("contents.View in Stone")}</a>
    )

}

export default StoneViewerLink