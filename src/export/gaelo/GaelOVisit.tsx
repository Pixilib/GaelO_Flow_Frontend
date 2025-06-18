
import { getVisit } from "../../services/gaelo";
import { Colors, useCustomQuery } from "../../utils";
import GaeloVisitDetails from "./GaelOVisitDetails";
import GaelOVisitUploadDicom from "./GaelOVisitUploadDicom";
import GaelOContext from "./context/GaelOContext";
import { useContext } from "react";
import PatientDicomComparison from "./dicoms/PatientDicomComparison";
import GaelORedirectReview from "./GaelORedirectReview";

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
        <div className="flex w-full flex-col gap-3">
            {visit != null &&
                <PatientDicomComparison
                    studyOrthancId={studyOrthancId}
                    patientId={visit?.patientId}
                />
            }
            <GaeloVisitDetails
                visit={visit}
            />
            <GaelORedirectReview
                visit={visit}
            />
            <GaelOVisitUploadDicom
                studyOrthancId={studyOrthancId}
                visitId={visitId}
                onActualiseVisit={onActualiseVisit}
                visitDetails={visit}
            />
        </div>
    )
}

export default GaelOVisit;