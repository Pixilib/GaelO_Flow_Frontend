import { useContext } from "react";
import GaelOContext from "./context/GaelOContext";
import { getGaelOInvestigatorFormLink } from "../../services/gaelo";

type GaelORedirectReviewProps = {
    visit: any;
}

const GaelORedirectReview = ({visit}: GaelORedirectReviewProps) => {
    const { studyName, role } = useContext(GaelOContext);

    const redirectToReview = () => {
        window.open(getGaelOInvestigatorFormLink(studyName, role, visit?.id));
    }

    return (
        <>
            {visit?.stateInvestigatorForm === "Not Done" && visit?.uploadStatus === "Done" &&
                <p className="text-sm text-gray-700 dark:text-white font-semibold">
                    A review is required for this visit. Please click
                    <button
                        className="ml-1 mr-1 cursor-pointer text-blue-600 hover:underline font-medium"
                        onClick={redirectToReview}
                    >
                        <span className="font-semibold">here</span>
                    </button>
                    to fill it out.
                </p>
            }
        </>
    )
}

export default GaelORedirectReview;