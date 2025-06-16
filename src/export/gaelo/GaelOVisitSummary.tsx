import { useContext, useState } from "react";
import { createVisit, getCreatableVisits, getVisit, validateDicomUpload } from "../../services/gaelo";
import { Badge, Button, ProgressBar, Spinner } from "../../ui";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import GaelOContext from "./context/GaelOContext";
import { StudyMainDicomTags } from "../../utils/types";
import { GaeloIcon } from "../../assets";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { exportRessourceIdsToLocalFilesystem } from "../../services/export";
import { getStudyStatistics } from "../../services/orthanc";
import ValidateDicomRefetch from "./ValidateDicomRefetch";

type GaelOVisitSummaryProps = {
  patientId: string;
  existingVisits: any[];
  studyMainDicomTag: StudyMainDicomTags;
  studyOrthancId: string;
};
const GaelOVisitSummary = ({
  patientId,
  existingVisits,
  studyMainDicomTag,
  studyOrthancId,
}: GaelOVisitSummaryProps) => {
  const { token, studyName, role } = useContext(GaelOContext);
  const [visit, setVisit] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);
  const [showSendToGaelOButton, setShowSendToGaelOButton] = useState<boolean>(false);
  const [sendToGaelOClicked, setSendToGaelOClicked] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [studyNumberOfInstances, setStudyNumberOfInstances] = useState<number>(0);
  const [showValidateSpinner, setShowValidateSpinner] = useState<boolean>(false);
  const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
  const [messageToShow, setMessageToShow] = useState<string | null>(null);
  const [colorMessageToShow, setColorMessageToShow] = useState<Colors | null>(null);

  const { toastSuccess, toastError } = useCustomToast();

  const { data: creatableVisits, isPending } = useCustomQuery(
    ["gaelo", "patients", patientId, "creatable-visits"],
    () => getCreatableVisits(token, patientId),
  );

  function formatDate(yyyymmdd) {
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6);
    const day = yyyymmdd.slice(6, 8);

    const date = new Date(`${year}-${month}-${day}`);
    return date.toISOString().slice(0, 10);
  }

  const { mutate: createVisitMutation } = useCustomMutation(
    (visitType: any) => createVisit(
      token,
      studyName,
      role,
      visitType.id,
      patientId,
      "Done",
      formatDate(studyMainDicomTag.studyDate)
    ),
    [
      ["gaelo", "study", studyName, role],
      ["gaelo", "patients", patientId, "creatable-visits"],
    ],
    {
      onSuccess: (data) => {
        toastSuccess(`Visit created successfully`);
        setVisit(data.id);
        setShowSendToGaelOButton(true);
      },
      onError: (error) => {
        toastError(`Failed to create visit: ${error}`);
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
      onError: (error) => {
        toastError(`Failed to get study statistics: ${error}`);
      },
    }
  );

  useCustomQuery(
    [""],
    () => getVisit(token, studyName, patientId, role),
    {
      enabled: queryEnabled,
      refetchInterval: (query) => {
        const data = query.state.data;
        if (!queryEnabled)
          return false;
        if (Array.isArray(data)) {
          const patient = data.find((p) => p.id === visit);
          setMessageToShow("Validating status : " + patient.uploadStatus);
        } else if (data && data.id === visit)
          setMessageToShow("Validating status : " + data.uploadStatus);
        return 1000;
      }
    }
  );

  const { mutate: mutateValidateDicomUpload } = useCustomMutation(
    ({ gaeloId }) => validateDicomUpload(
      token,
      visit,
      studyOrthancId,
      [gaeloId],
      studyNumberOfInstances,
    ),
    [
      ["visits", "validate-dicom"],
    ],
    {
      onSuccess: () => {
        toastSuccess("DICOM upload validated successfully");
        setQueryEnabled(false);
        setShowValidateSpinner(false);
        setMessageToShow("Status finished you can now close this window");
        setColorMessageToShow(Colors.success);
      },
      onError: (error) => {
        toastError(`Failed to validate DICOM upload: ${error}`);
        setQueryEnabled(false);
        setShowValidateSpinner(false);
        setMessageToShow("Failed to validate DICOM upload");
        setColorMessageToShow(Colors.danger);
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
    setSendToGaelOClicked(true);
    setShowSendToGaelOButton(false);
    setProgress(0);
    mutateGetStudyStatistics(undefined);
    const file = await exportRessourceIdsToLocalFilesystem([studyOrthancId], (mb) => {
      setMessageToShow(`Downloading ${mb} MB`);
      setColorMessageToShow(Colors.success);
    })
    setMessageToShow("Sending DICOM to GaelO...");
    const gaeloId = await sendToGaelo(file);
    setMessageToShow("Validating DICOM upload...");
    setColorMessageToShow(Colors.warning);
    mutateValidateDicomUpload({ gaeloId });
    setShowValidateSpinner(true);
    setQueryEnabled(true);
  }

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl shadow-md">
        <div className="flex gap-3 items-center bg-gray-200 h-15 p-2 rounded-t-xl">
          <p className="text-sm text-gray-700 underline font-bold w-25">Created : </p>
          {existingVisits.map((visit) => {
            return (
              <Button
                color={Colors.success}
                children={
                  <p>{visit?.visitType?.name}</p>
                }
                className="text-xs"
                disabled
              />
            );
          })}
        </div>
        <div className="flex gap-3 items-center bg-gray-300 h-15 p-2 rounded-b-xl">
          <p className="text-sm text-gray-700 underline font-bold w-25">Creatable : </p>
          {creatableVisits?.map((visitType) => {
            return (
              <Button
                disabled={!!visit}
                color={Colors.blueCustom}
                children={
                  <p>Create {visitType.name}</p>
                }
                className="text-xs"
                onClick={() => { setVisitType(visitType.name); createVisitMutation(visitType) }}
              />
            );
          })}
        </div>
      </div>
      {showSendToGaelOButton &&
        <Button
          color={Colors.success}
          onClick={handleExport}
          children={
            <div className="flex flex-row items-center gap-1">
              <p>Send DICOM to</p>
              <GaeloIcon />
              <p>({visitType})</p>
            </div>
          }
        />
      }

      <ValidateDicomRefetch
        patientId={patientId}
        visitId={visit}
        sendToGaelOClicked={sendToGaelOClicked}
        progress={progress}
        downloadedMb={studyNumberOfInstances}
        showSpinner={showValidateSpinner}
        messageToShow={messageToShow}
        colorMessageToShow={colorMessageToShow}
      />
    </div>
  );
};

export default GaelOVisitSummary;
