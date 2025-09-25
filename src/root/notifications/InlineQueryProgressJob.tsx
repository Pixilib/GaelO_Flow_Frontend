import React, { useEffect, useState } from "react";
import { Colors, OrthancJob, useCustomQuery } from "../../utils";
import { getJobById } from "../../services/jobs";
import { Button, ToggleChevron } from "../../ui";
import { Anon, Close, Export, Trash } from "../../icons";
import { useDispatch } from "react-redux";
import { JobType, removeJob } from "../../reducers/JobSlice";
import { ProcessingJob } from "../../utils/types";
import { getProcessingJob } from "../../services/processing";
import {
  calculateOrthancSeriesID,
  calculateOrthancStudyID,
} from "../../utils/calculateOrthandId";
import {
  addSeriesOfStudyIdToExportList,
  addSeriesToExportListFromSeriesId,
  addStudyIdToAnonymizeList,
  addStudyIdToDeleteList,
} from "../../utils/actionsUtils";
import { useTranslation } from "react-i18next";

type ProgressInlineJobProps = {
  jobId: string;
  jobType: JobType;
  onJobCompleted?: (jobStatus: string) => void;
};

const InlineQueryProgressJob: React.FC<ProgressInlineJobProps> = ({
  jobId,
  jobType,
  onJobCompleted,
}) => {
  const dispatch = useDispatch();

const {t} = useTranslation()

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [orthancId, setOrthancId] = useState<string | null>(null);

  const {
    data: jobData,
    isLoading,
    error,
  } = useCustomQuery<OrthancJob | ProcessingJob>(
    ["job", jobId],
    () => (jobType === "orthanc" ? getJobById(jobId) : getProcessingJob(jobId)),
    {
      refetchInterval: (query) => {
        const data = query.state.data;
        if (data?.state === "Success" || data?.state === "Failure") {
          onJobCompleted && onJobCompleted(query.state.data?.state);
          return false;
        }
        return 1000;
      },
    }
  );

  useEffect(() => {
    (async () => {
      const patientId = jobData?.content?.Query?.[0]?.["0010,0020"];
      const studyInstanceUID = jobData?.content?.Query?.[0]?.["0020,000d"];
      if (jobData?.content?.Query?.[0]?.["0008,0052"] === "STUDY") {
        const id = await calculateOrthancStudyID(patientId, studyInstanceUID);
        setOrthancId(id);
      } else if (jobData?.content?.Query?.[0]?.["0008,0052"] === "SERIES") {
        const seriesInstanceUID = jobData?.content?.Query?.[0]?.["0020,000e"];
        const id = await calculateOrthancSeriesID(
          patientId,
          studyInstanceUID,
          seriesInstanceUID
        );
        setOrthancId(id);
      }
    })();
  }, [jobData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: </div>;
  if (!jobData) return <div>No job data available</div>;
  const getTextColor = (state: string) => {
    switch (state) {
      case "Pending":
        return "bg-warning/20";
      case "Running":
        return "bg-warning/20";
      case "Success":
        return "bg-green-200/90 dark:bg-green-200/40";
      case "Failure":
        return "bg-red-200/90 dark:bg-red-200/40";
      case "Paused":
        return "bg-blue-200/90 dark:bg-blue-200/40";
      case "Retry":
        return "bg-red-200/90 dark:bg-red-200/40";
    }
  };

  const handleRemoveJob = () => {
    dispatch(removeJob(jobId));
  };

  const handleAnonymizeClick = async () => {
    await addStudyIdToAnonymizeList(orthancId);
  };

  const handleExportClick = async () => {
    if (jobData?.content?.Query?.[0]?.["0008,0052"] === "SERIES")
      await addSeriesToExportListFromSeriesId(orthancId);
    else if (jobData?.content?.Query?.[0]?.["0008,0052"] === "STUDY")
      await addSeriesOfStudyIdToExportList(orthancId);
  };

  const handleDeleteClick = async () => {
    await addStudyIdToDeleteList(orthancId);
  };

  return (
    <div
      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
      className={`flex flex-col gap-2 cursor-pointer border border-gray-400 p-2 rounded-lg text-gray-600 dark:text-white ${getTextColor(jobData.state)} hover:border-blue-300`}
    >
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-bold text-sm">
            Job {jobData.type} is {jobData.state}
          </p>
          <button
            className="cursor-pointer transition-transform duration-150 hover:scale-125"
            onClick={handleRemoveJob}
          >
            <Close className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs font-semibold">{t("root.notification.progress")} {jobData.progress}%</p>
        <div className="flex flex-row items-center justify-between w-full ">
          <p className="text-xs font-semibold">{t("root.notification.click-to-see-details")}</p>
          <ToggleChevron isOpen={isDetailsOpen} className="w-3.5 h-3.5 mr-1" />
        </div>
      </div>
      {isDetailsOpen && (
        <>
          <div className="border-b border-gray-700 w-full" />
          <div className="flex flex-col w-full text-xs">
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">{t("root.notification.level")}</p>
              <p className="font-semibold">
                {jobData?.content?.Query?.[0]?.["0008,0052"]}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">{t("root.notification.patientID")}</p>
              <p className="font-semibold">
                {jobData?.content?.Query?.[0]?.["0010,0020"] === ""
                  ? "N/A"
                  : jobData?.content?.Query?.[0]?.["0010,0020"]}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">{t("root.notification.from")}</p>
              <p className="font-semibold">{jobData?.content?.RemoteAet}</p>
            </div>
          </div>
          <div className="border-b border-gray-700 w-full" />
          {jobData?.state === "Success" && (
            <div className="w-full flex justify-around">
              <Button
                color={Colors.blueCustom}
                children={<Anon className="" />}
                className="rounded-xl w-10 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnonymizeClick();
                }}
                disabled={jobData.state !== "Success"}
              />
              <Button
                color={Colors.warning}
                children={<Export />}
                className="rounded-xl w-10 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExportClick();
                }}
              />
              <Button
                color={Colors.danger}
                children={<Trash />}
                className="rounded-xl w-10 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InlineQueryProgressJob;
