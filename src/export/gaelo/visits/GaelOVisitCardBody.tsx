import { CardBody } from "../../../ui";
import PatientDicomComparison from "../comparaison/PatientDicomComparison";
import GaelOVisitUploadDicom from "./GaelOVisitUploadDicom";
import GaeloVisitDetails from "./GaelOVisitDetails";
import { useState } from "react";

type GaelOVisitCardBodyProps = {
    visit: any;
    studyOrthancId: string;
    visitId: string;
    onActualiseVisit: () => void;
}

const GaelOVisitCardBody = ({ visit, studyOrthancId, visitId, onActualiseVisit }: GaelOVisitCardBodyProps) => {
    const [authorizedToSend, setAuthorizedToSend] = useState(false);

    const handleAuthorizedToSendChange = (value: boolean) => {
        setAuthorizedToSend(value);
    };

    return (
        <CardBody
            children={
                <div className="flex flex-col gap-3">
                    <GaeloVisitDetails
                        visit={visit}
                    />
                    {visit?.statusDone === "Done" &&
                        <>
                            {visit != null &&
                                <PatientDicomComparison
                                    studyOrthancId={studyOrthancId}
                                    patientId={visit?.patientId}
                                    onAuthorizedToSendChange={handleAuthorizedToSendChange}
                                    visit={visit}
                                />
                            }
                            <GaelOVisitUploadDicom
                                studyOrthancId={studyOrthancId}
                                visitId={visitId}
                                onActualiseVisit={onActualiseVisit}
                                visitDetails={visit}
                                authorizedToSend={authorizedToSend}
                            />
                        </>
                    }
                </div>
            }
        />
    )
}

export default GaelOVisitCardBody;