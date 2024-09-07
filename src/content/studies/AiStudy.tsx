/**
 * Component for a modal to preview a study
 * @name PreviewStudy
 */

import React, { useState } from "react";
import { getSeriesOfStudy } from "../../services/orthanc";
import { Colors, useCustomQuery } from "../../utils";

import { Button, Modal, Spinner } from "../../ui";
import { Series } from "../../utils/types";

type AIStudyProps = {
    studyId: string;
    onClose: () => void;
    show: boolean;
}

const AiStudy: React.FC<AIStudyProps> = ({ studyId, onClose, show }) => {

    const [selectedSeries, setSelectedSeries] = useState([]);

    const { data: series, isLoading } = useCustomQuery(
        ['study', studyId, 'series'],
        () => getSeriesOfStudy(studyId),
        {
            select: (instances: Series[]) => {
                return instances.sort((a, b) => a.mainDicomTags?.seriesDescription?.localeCompare(b.mainDicomTags?.seriesDescription ?? "") ?? 0)
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
                                <Button color={selectedSeries.includes(series.id) ? Colors.success : Colors.secondary} onClick={() => handleSeriesClick(series.id)} >
                                    {series.mainDicomTags.modality} - {series.mainDicomTags.seriesDescription}
                                </Button>
                            )
                        })
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex justify-center"}>
                    <Button color={Colors.success} onClick={() => { handleExecute }}>Execute TMTV Model</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AiStudy;
