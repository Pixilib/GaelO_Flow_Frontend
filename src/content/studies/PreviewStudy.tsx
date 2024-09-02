/**
 * Component for a modal to preview a study
 * @name PreviewStudy
 */

import React from "react";
import { getSeriesOfStudy } from "../../services/orthanc";
import { useCustomQuery } from "../../utils";

import { Accordion, Modal, Spinner } from "../../ui";
import { Series } from "../../utils/types";
import { AccordionHeader } from "../../ui/Accordion";
import PreviewSeries from "../series/PreviewSeries";

type PreviewStudyProps = {
    studyId: string;
    onClose: () => void;
    show: boolean;
}

const PreviewStudy: React.FC<PreviewStudyProps> = ({ studyId, onClose, show }) => {

    const { data: series, isLoading } = useCustomQuery(
        ['study', studyId, 'series'],
        () => getSeriesOfStudy(studyId),
        {
            select: (instances: Series[]) => {
                return instances.sort((a, b) => a.mainDicomTags?.seriesDescription?.localeCompare(b.mainDicomTags?.seriesDescription ?? "") ?? 0)
            }
        }
    )

    if (isLoading) return <Spinner />

    return (
        <Modal show={show} size='xl'>
            <Modal.Header onClose={onClose} >
                <Modal.Title>Preview Study</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"flex flex-col w-full h-full gap-3"}>
                    {
                        series?.map((series: Series) => {
                            return (
                                <Accordion variant="secondary" header={<AccordionHeader variant="primary">{(series.mainDicomTags?.seriesDescription?.length ?? 0) > 0 ? series.mainDicomTags?.seriesDescription : "N/A"}</AccordionHeader>}>
                                    <PreviewSeries seriesId={series.id} />
                                </Accordion>
                            )
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PreviewStudy;
