import { useContext, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { gaelOUrl, validateDicomUpload } from "../../../services/gaelo";
import { Colors, useCustomMutation, useCustomQuery } from "../../../utils";
import { Button, ProgressBar } from "../../../ui";
import { getStudyStatistics } from "../../../services/orthanc";
import { exportRessourceIdsToLocalFilesystem } from "../../../services/export";
import { GaeloIcon } from "../../../assets";
import GaelOContext from "../context/GaelOContext";
import PatientDicomComparison from "../comparaison/PatientDicomComparison";

type GaelOVisitUploadDicomProps = {
    studyOrthancId: string;
    visitId: string;
    onActualiseVisit: () => void;
    visitDetails: any;
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
}: GaelOVisitUploadDicomProps) => {

    const [authorizedToSend, setAuthorizedToSend] = useState(false);
    const [message, setMessage] = useState<UploadMessage | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [exportStarted, setExportStarted] = useState<boolean>(false);

    const { token } = useContext(GaelOContext);

    const { data: numberOfInstances } = useCustomQuery(
        ["studies", studyOrthancId, "statistics"],
        () => getStudyStatistics(studyOrthancId),
        {
            select: (data) => {
                return data.CountInstances;
            }
        }
    );

    const { mutate: mutateValidateDicomUpload } = useCustomMutation(
        ({ gaeloId }) => validateDicomUpload(
            token,
            visitId,
            studyOrthancId,
            [gaeloId],
            numberOfInstances,
        ),
        [
            ["visits", "validate-dicom"],
        ],
        {
            onError: (error) => {
                setMessage({ message: "Failed to validate DICOM upload", color: Colors.danger });
            },
        }
    );

    const sendToGaelo = async (file: File): Promise<string> => {
        const uppy = new Uppy()
            .use(Tus, {
                endpoint: gaelOUrl + `/api/tus`,
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

    const handleAuthorizedToSendChange = (value: boolean) => {
        setAuthorizedToSend(value);
    };

    const handleExport = async () => {
        setExportStarted(true);
        setProgress(0);
        const file = await exportRessourceIdsToLocalFilesystem([studyOrthancId], (mb) => {
            setMessage({ message: `Step 1/3 : Downloading ${mb} MB`, color: Colors.warning });
        })
        setMessage({ message: "Step 2/3 : Sending DICOM to GaelO...", color: Colors.warning });
        const gaeloId = await sendToGaelo(file);
        if (visitDetails?.stateInvestigatorForm === "Not Done") {
            setMessage({ message: "Step 3/3 : Validating DICOM upload, don't forget to the fill investigator form in GaelO", color: Colors.warning });
        } else {
            setMessage({ message: "Step 3/3 : Validating DICOM upload...", color: Colors.warning });
        }
        mutateValidateDicomUpload({ gaeloId });
        setTimeout(() => {
            setProgress(100);
            onActualiseVisit();
        }, 500);
    }

    return (
        <div className="flex flex-col w-full gap-3">
            {visitDetails?.uploadStatus === "Not Done" && !exportStarted &&
                <PatientDicomComparison
                    studyOrthancId={studyOrthancId}
                    patientId={visitDetails?.patientId}
                    onAuthorizedToSendChange={handleAuthorizedToSendChange}
                    visit={visitDetails}
                />
            }
            {!exportStarted &&
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
            {message != null && (
                <div>
                    <p className={`font-bold bg-${message.color} text-white rounded p-3`}>{message.message}</p>
                </div>
            )}
            {progress < 100 && progress > 0 && (
                <ProgressBar progress={progress} />
            )}

        </div>
    );
}

export default GaelOVisitUploadDicom;