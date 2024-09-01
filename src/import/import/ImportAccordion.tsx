import React from 'react';
import { Accordion, AccordionHeader } from '../../ui';
import ImportTableStudy from './ImportTableStudy';
import ImportTableSeries from './ImportTableSeries';

interface ImportAccordionProps {
    studiesData: any[];
    seriesData: any[];
    selectedStudyInstanceUID: string | null;
    onStudyClick: (studyInstanceUID: string) => void;
}

const ImportAccordion: React.FC<ImportAccordionProps> = ({ studiesData, seriesData, selectedStudyInstanceUID, onStudyClick }) => {
    return (
        <Accordion
            header={
                <AccordionHeader variant='primary'>
                    Patients
                </AccordionHeader>
            }
            className="w-full rounded-2xl"
            defaultOpen={true}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                <div className="flex-1">
                    {studiesData.length > 0 ? (
                        <ImportTableStudy
                            data={studiesData}
                            selectedStudyInstanceUID={selectedStudyInstanceUID}
                            onStudyClick={onStudyClick}
                        />
                    ) : (
                        <p>No study data available</p>
                    )}
                </div>
                {selectedStudyInstanceUID && (
                    <div className="flex-1">
                        {seriesData.length > 0 ? (
                            <ImportTableSeries data={seriesData} />
                        ) : (
                            <p>No series data available</p>
                        )}
                    </div>
                )}
            </div>
        </Accordion>
    );
};

export default ImportAccordion;
