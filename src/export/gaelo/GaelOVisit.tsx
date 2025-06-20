
import { getVisit } from "../../services/gaelo";
import { Colors, useCustomQuery } from "../../utils";
import GaelOContext from "./context/GaelOContext";
import { useContext } from "react";
import { Card } from "../../ui";
import GaelOVisitCardHeader from "./GaelOVisitCardHeader";
import GaelOVisitCardBody from "./GaelOVisitCardBody";

type GaelOVisitProps = {
    studyOrthancId: string;
    visitId: string;
}

export type UploadMessage = {
    message: string;
    color: Colors;
}

const GaelOVisit = ({
    studyOrthancId,
    visitId,
}: GaelOVisitProps) => {

    const { token, studyName } = useContext(GaelOContext);

    const { data: visit, refetch } = useCustomQuery(
        [visitId],
        () => getVisit(token, studyName, visitId, "Investigator"),
        {
            refetchInterval: (query) => {
                const data = query.state.data;
                if (data === undefined)
                    return 1000;
                if (data.uploadStatus === "Processing") {
                    return 1000
                } else {
                    return false;
                }
            }
        }
    );

    const onActualiseVisit = () => {
        refetch();
    };

    return (
        <Card>
            <GaelOVisitCardHeader
                visit={visit}
            />
            <GaelOVisitCardBody
                visit={visit}
                studyOrthancId={studyOrthancId}
                visitId={visitId}
                onActualiseVisit={onActualiseVisit}
            />
        </Card>
    )
}

export default GaelOVisit;