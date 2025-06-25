import { useContext, useEffect, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { validateDicomUpload } from "../../../services/gaelo";
import { Colors, useCustomMutation } from "../../../utils";
import { Button, ProgressBar, Spinner } from "../../../ui";
import { getStudyStatistics } from "../../../services/orthanc";
import { exportRessourceIdsToLocalFilesystem } from "../../../services/export";
import { GaeloIcon } from "../../../assets";
import GaelOContext from "../context/GaelOContext";

type GaelOVisitUploadDicomProps = {
    studyOrthancId: string;
    visitId: string;
    onActualiseVisit: () => void;
    visitDetails: any;
    authorizedToSend: boolean;
}

type UploadMessage = {
    message: string;
    color: Colors;
}

const GaelOVisitUploadDicom = ({
    studyOrthancId,
    visitId,
    onActualiseVisit,
    visitDetails,
    authorizedToSend,
}: GaelOVisitUploadDicomProps) => {

    const [message, setMessage] = useState<UploadMessage | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [studyNumberOfInstances, setStudyNumberOfInstances] = useState<number>(0);

    const { token } = useContext(GaelOContext);

    const { mutate: mutateValidateDicomUpload } = useCustomMutation(
        ({ gaeloId }) => validateDicomUpload(
            token,
            visitId,
            studyOrthancId,
            [gaeloId],
            studyNumberOfInstances,
        ),
        [
            ["visits", "validate-dicom"],
        ],
        {
            onSuccess: () => {
                setShowSpinner(false);
                setMessage({ message: "Status finished you can now close this tab", color: Colors.success });
                if (visitDetails?.stateInvestigatorForm === "Not Done")
                    setMessage(null);
            },
            onError: (error) => {
                setShowSpinner(false);
                setMessage({ message: "Failed to validate DICOM upload", color: Colors.danger });
            },
        }
    );

    const { mutate: mutateGetStudyStatistics } = useCustomMutation(
        () => getStudyStatistics(studyOrthancId),
        [["studies", studyOrthancId, "statistics"]],
        {
            onSuccess: (data) => {
                setStudyNumberOfInstances(data.CountInstances);
                console.log("Study statistics:", data);
            },
        }
    );

    const sendToGaelo = async (file: File): Promise<string> => {
        const uppy = new Uppy()
            .use(Tus, {
                endpoint: `https://v2-test.gaelo.fr/api/tus`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                chunkSize: 2000000,
            });

        return new Promise((resolve, reject) => {
            uppy.on('upload-success', (file, response) => {
                const uploadUrl = response.uploadURL;
                resolve(uploadUrl.split('/').pop());
            });
            uppy.on('error', (error) => {
                reject(error);
            });
            uppy.on('upload-progress', (file, progress) => {
                const percent = Math.round((progress.bytesUploaded / progress.bytesTotal) * 100);
                setProgress(percent);
            });

            uppy.addFile({
                name: file.name,
                type: file.type,
                data: file,
            });

            uppy.upload();
        });
    };

    const handleExport = async () => {
        setButtonClicked(true);
        setProgress(0);
        mutateGetStudyStatistics(undefined);
        const file = await exportRessourceIdsToLocalFilesystem([studyOrthancId], (mb) => {
            setMessage({ message: `Step 1/3 : Downloading ${mb} MB`, color: Colors.success });
        })
        setMessage({ message: "Step 2/3 : Sending DICOM to GaelO...", color: Colors.success });
        const gaeloId = await sendToGaelo(file);
        setMessage({ message: "Step 3/3 : Validating DICOM upload...", color: Colors.warning });
        setShowSpinner(true);
        mutateValidateDicomUpload({ gaeloId });
        setTimeout(() => {
            setProgress(100);
            onActualiseVisit();
        }, 500);
    }

    useEffect(() => {
        setButtonClicked(false);
        setMessage(null);
    }, [visitId]);

    return (
        <div className="flex flex-col w-full">
            {visitDetails?.uploadStatus === "Not Done" && !buttonClicked &&
                <Button
                    color={Colors.success}
                    onClick={handleExport}
                    disabled={!authorizedToSend}
                    children={
                        <div className="flex flex-row items-center gap-1">
                            <p>Send DICOM to</p>
                            <span className="mb-0.5"><GaeloIcon /></span>
                            <p>({visitDetails?.visitType?.name})</p>
                        </div>
                    }
                />
            }
            {progress < 100 && progress > 0 && (
                <ProgressBar progress={progress} />
            )}
            {showSpinner && (
                <div>
                    <Spinner />
                </div>
            )}
            {message != null && (
                <div>
                    <p className={`text-${message.color}`}>{message.message}</p>
                </div>
            )}
        </div>
    );
}

export default GaelOVisitUploadDicom;