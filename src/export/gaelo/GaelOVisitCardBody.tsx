import { CardBody } from "../../ui";
import PatientDicomComparison from "./dicoms/PatientDicomComparison";
import GaelOVisitUploadDicom from "./GaelOVisitUploadDicom";
import GaeloVisitDetails from "./GaelOVisitDetails";

type GaelOVisitCardBodyProps = {
    visit: any;
    studyOrthancId: string;
    visitId: string;
    onActualiseVisit: () => void;
}

const GaelOVisitCardBody = ({ visit, studyOrthancId, visitId, onActualiseVisit }: GaelOVisitCardBodyProps) => {


    return (
        <CardBody
            children={
                <div className="flex flex-col gap-3">
                    <GaeloVisitDetails
                        visit={visit}
                    />
                    {visit != null &&
                        <PatientDicomComparison
                            studyOrthancId={studyOrthancId}
                            patientId={visit?.patientId}
                        />
                    }
                    <GaelOVisitUploadDicom
                        studyOrthancId={studyOrthancId}
                        visitId={visitId}
                        onActualiseVisit={onActualiseVisit}
                        visitDetails={visit}
                    />
                </div>
            }
        />
    )
}

export default GaelOVisitCardBody;