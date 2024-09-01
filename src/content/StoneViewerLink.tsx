import { store } from "../store"

type StoneViewerLinkProps = {
    studyInstanceUID: string
}
const StoneViewerLink = ({ studyInstanceUID }: StoneViewerLinkProps) => {
    const token = store?.getState()?.user.token
    return (
        <a href={'/viewer-stone/index.html?study=' + studyInstanceUID + '&token=' + token} className="w-full" target='_blank'>View in Stone</a>
    )

}

export default StoneViewerLink