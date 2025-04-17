/**
 * Component for a modal to preview a study
 * @name PreviewStudy
 */

import React, { useState } from "react";
import { getSeriesOfStudy } from "../../services/orthanc";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";

import { Button, Modal, ProgressCircle, Spinner } from "../../ui";
import { ProcessingJob, Series } from "../../utils/types";
import { createProcessingJob, getProcessingJob } from "../../services/processing";
import { useDispatch } from "react-redux";
import { addJob } from "../../reducers/JobSlice";

type AIStudyProps = {
    studyId: string;
    onClose: () => void;
    show: boolean;
}

const AiStudy: React.FC<AIStudyProps> = ({ studyId, onClose, show }) => {
    const { toastSuccess, toastError } = useCustomToast()
    const dispatch = useDispatch()
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [jobId, setJobId] = useState<string | null>(null);

    const { data: series, isLoading } = useCustomQuery(
        ['study', studyId, 'series'],
        () => getSeriesOfStudy(studyId),
        {
            select: (instances: Series[]) => {
                return instances.sort((a, b) => a.mainDicomTags?.seriesDescription?.localeCompare(b.mainDicomTags?.seriesDescription ?? "") ?? 0)
            }
        }
    )

    const { data: jobData } = useCustomQuery<ProcessingJob>(
        ['processing', jobId ?? ''],
        () => getProcessingJob(jobId),
        {
            enabled: jobId != null,
            refetchInterval: 2000
        }
    )

    const { mutate: createProcessingJobMutate } = useCustomMutation(
        ({ jobType, jobPayload }) => createProcessingJob(jobType, jobPayload),
        [[]],
        {
            onSuccess: (jobId) => {
                toastSuccess("Job Created")
                setJobId(jobId)
                dispatch(addJob({ jobId, jobType: 'processing' }))
            }
        }
    )

    const handleSeriesClick = (seriesId: string) => {
        if (selectedSeries.includes(seriesId)) {
            const newSelected = selectedSeries.filter((id) => id !== seriesId)
            setSelectedSeries(newSelected)

        } else {
            setSelectedSeries(previousSeries => [...previousSeries, seriesId])
        }
    }

    const handleExecute = () => {
        if (selectedSeries.length !== 2) {
            toastError('Select only 2 series, PT and CT')
            return;
        }
        createProcessingJobMutate({
            jobType: 'tmtv',
            jobPayload: {
                CtOrthancSeriesId: selectedSeries[0],
                PtOrthancSeriesId: selectedSeries[1],
                SendMaskToOrthancAs: ['seg'],
                WithFragmentedMask: true,
            }
        })
    }

    if (isLoading) return <Spinner />

    return (
        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose} >
                <Modal.Title>AI Inference</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"flex justify-center gap-3"}>
                    {
                        series?.map((series: Series) => {
                            return (
                                <Button key={series.id} color={selectedSeries.includes(series.id) ? Colors.success : Colors.secondary} onClick={() => handleSeriesClick(series.id)} >
                                    {series.mainDicomTags.modality} - {series.mainDicomTags.seriesDescription}
                                </Button>
                            )
                        })
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex justify-center"}>
                    <Button color={Colors.success} onClick={handleExecute}>Execute TMTV Model</Button>
                    {jobData && <ProgressCircle progress={jobData.progress} text={jobData.state} />}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AiStudy;
