import { getVisit } from "../../services/gaelo";
import { Colors, useCustomQuery } from "../../utils";
import { useCallback, useContext, useEffect, useState } from "react";
import GaelOContext from "./context/GaelOContext";
import { ProgressBar, Spinner } from "../../ui";

type ValidateDicomRefetchProps = {
    patientId: string;
    visitId: string;
    sendToGaelOClicked: boolean;
    progress: number;
    downloadedMb: number;
    showSpinner: boolean;
    messageToShow: string | null;
    colorMessageToShow: Colors | null;
}

const ValidateDicomRefetch = ({
    progress,
    showSpinner,
    messageToShow,
    colorMessageToShow
}: ValidateDicomRefetchProps) => {
    const { token, studyName, role } = useContext(GaelOContext);

    return (
        <div>
            {progress < 100 && progress > 0 && (
                <ProgressBar progress={progress} />
            )}
            {showSpinner && (
                <div>
                    <Spinner />
                </div>
            )}
            {messageToShow != null && (
                <div>
                    <p className={`text-${colorMessageToShow}`}>{messageToShow}</p>
                </div>
            )}
        </div>
    );
}

export default ValidateDicomRefetch;