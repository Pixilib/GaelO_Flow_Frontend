import { useState } from "react";
import { CardBody } from "../../../ui";
import PatientDicomComparison from "../comparaison/PatientDicomComparison";
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
                    {visit?.statusDone === "Done" &&
                        <>
                            {visit != null && ["Not Done", "Processing"].includes(visit.uploadStatus) &&
                                <>
                                    <GaelOVisitUploadDicom
                                        key={visitId}
                                        studyOrthancId={studyOrthancId}
                                        visitId={visitId}
                                        onActualiseVisit={onActualiseVisit}
                                        visitDetails={visit}
                                    />
                                </>
                            }
                        </>
                    }
                </div>
            }
        />
    )
}

export default GaelOVisitCardBody;