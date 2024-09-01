import { store } from "../store"

type OhifViewerLinkProps = {
    studyInstanceUID: string
}
const OhifViewerLink = ({ studyInstanceUID }: OhifViewerLinkProps) => {
    const token = store?.getState()?.user.token
    return (
        <a href={'/viewer-ohif/viewer?StudyInstanceUIDs=' + studyInstanceUID + '&token=' + token} target='_blank'>View in OHIF</a>
    )

}

export default OhifViewerLink