import { useContext } from "react";
import { getCreatableVisits } from "../../services/gaelo";
import { Badge } from "../../ui";
import { useCustomQuery } from "../../utils";
import GaelOContext from "./context/GaelOContext";

type GaelOVisitSummaryProps = {
  patientId: string;
  existingVisits: any[];
};
const GaelOVisitSummary = ({
  patientId,
  existingVisits,
}: GaelOVisitSummaryProps) => {
  const { token } = useContext(GaelOContext);

  const { data: creatableVisits } = useCustomQuery(
    ["gaelo", "patients", patientId, "creatable-visits"],
    () => getCreatableVisits(token, patientId)
  );
  
  return (
    <>
      <div className="flex gap-3">
        <span className="text-sm">Created : </span>
        {existingVisits.map((visit) => {
          return <Badge variant="success">{visit?.visitType?.name}</Badge>;
        })}
      </div>
      <div className="flex gap-3">
        <span className="text-sm">Creatable : </span>
        {creatableVisits?.map((visitType) => {
          return <Badge variant="default">{visitType.name}</Badge>;
        })}
      </div>
    </>
  );
};

export default GaelOVisitSummary;
