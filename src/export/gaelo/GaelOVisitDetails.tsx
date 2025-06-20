import { Badge } from "../../ui";

type GaeloVisitDetailsProps = {
    visit: any;
};

const GaeloVisitDetails = ({ visit }: GaeloVisitDetailsProps) => {
    return (
        <div className="flex flex-row justify-around">
            <Badge
                variant={
                    visit?.statusDone === "Done" ? "success" :
                        visit?.statusDone === "Not Done" ? "danger" : "warning"
                }
            >
                <div className="flex items-center">
                    <p className={`font-semibold`}>Visit status : {visit?.statusDone}</p>
                </div>
            </Badge>
            <Badge
                variant={
                    visit?.uploadStatus === "Done" ? "success" :
                        visit?.uploadStatus === "Not Done" ? "danger" : "warning"
                }
            >
                <div className="flex ">
                    <p className={`font-semibold`}>Upload status : {visit?.uploadStatus}</p>
                    <p></p>
                </div>
            </Badge>
            <Badge
                variant={
                    visit?.stateInvestigatorForm === "Done" ? "success" :
                        visit?.stateInvestigatorForm === "Not Needed" ? "success" :
                            visit?.stateInvestigatorForm === "Not Done" ? "danger" : "warning"
                }
            >
                <div className="flex">
                    <p className={`font-semibold`}>Investigator Form : {visit?.stateInvestigatorForm}</p>
                </div>
            </Badge>
        </div>
    )
}

export default GaeloVisitDetails;