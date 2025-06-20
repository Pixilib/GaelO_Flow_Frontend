import { GaeloIcon } from "../../../assets";
import { Button, CardHeader } from "../../../ui";
import { Colors } from "../../../utils";
import { getGaelOVisitLink } from "../../../services/gaelo";
import { useContext } from "react";
import GaelOContext from "../context/GaelOContext";

const GaelOVisitCardHeader = ({ visit, studyOrthancId }: { visit: any; studyOrthancId?: string }) => {
    const { role, userId, token, studyName } = useContext(GaelOContext);

    return (
        <CardHeader
            color={Colors.primary}
            children={
                <div className="flex flex-row justify-between items-center w-full pl-3 pr-3">
                    <div className="flex flex-row text-white items-center rounded-lg gap-5">
                        <h2 className="flex flex-row gap-5 items-center font-semibold">
                            <p><span className={"font-semibold"}>Visit details</span></p>
                        </h2>
                        <div className="h-7 border-r" />
                        <div className={"flex flex-row gap-15 font-semibold text-sm"}>
                            <p>Group : {visit?.visitGroup?.name}</p>
                            <p>Visit : {visit?.visitType?.name}</p>
                            <p>Date : {visit?.visitDate?.slice(0, 10)}</p>
                        </div>
                    </div>
                    <Button
                        className="h-10"
                        color={Colors.warning}
                        children={
                            <div className="text-sm flex flex-row gap-0.5 items-center">
                                <p>Open visit in</p>
                                <span className="mb-0.5"><GaeloIcon className="h-3.5" /></span>
                            </div>
                        }
                        onClick={() => window.open(getGaelOVisitLink(studyName, role, visit?.id, token, userId))}
                    />
                </div>
            }
        />
    )
}

export default GaelOVisitCardHeader;