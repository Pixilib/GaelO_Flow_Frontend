import React, { useState } from "react";
import { useCustomQuery, useCustomMutation, useCustomToast } from "../utils";
import { getSeriesOfStudy, deleteStudy, modifyStudy, getStudies, getSeries, modifySeries, deleteSeries } from "../services/orthanc";
import Patient from "../model/Patient";
import StudyTable from "./studies/StudyTable";
import SeriesTable from "./series/SeriesTable";
import { OrthancResponse, Series, Study, StudyMainDicomTags, StudyPayload, SeriesPayload } from '../utils/types';
import { useConfirm } from "../services";
import EditModal, { EditModalSubmitParams } from "../ui/EditModal";
import StudyEditForm from "./studies/StudyEditForm";
import SeriesEditForm from "./series/SeriesEditForm";

const StudiesManager: React.FC<{ patient: Patient }> = ({ patient }) => {
    const [currentStudyId, setCurrentStudyId] = useState<string | null>(null);
    const [editingStudyId, setEditingStudyId] = useState<string | null>(null);
    const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);

    const { toastSuccess, toastError } = useCustomToast();
    const { confirm } = useConfirm();

    const { data: editingStudyDetails, isLoading: isLoadingStudyDetails, refetch: refetchStudyDetails } = useCustomQuery<Study>(
        ['studies', editingStudyId ?? ''],
        () => getStudies(editingStudyId as string),
        {
            enabled: !!editingStudyId,
            onSuccess: (data) => {
                console.log("Study details loaded successfully:", data);
            },
            onError: (error) => {
                console.error("Error fetching study details:", error);
                toastError("Failed to load study details");
                setEditingStudyId(null);
            },
        }
    );

    const { data: editingSeriesDetails, isLoading: isLoadingSeriesDetails, refetch: refetchSeriesDetails } = useCustomQuery<Series>(
        ['series', editingSeriesId ?? ''],
        () => getSeries(editingSeriesId as string),
        {
            enabled: !!editingSeriesId,
            onSuccess: (data) => {
                console.log("Series details loaded successfully:", data);
            },
            onError: (error) => {
                console.error("Error fetching series details:", error);
                toastError("Failed to load series details");
                setEditingSeriesId(null);
            },
        }
    );

    const { data: seriesByStudy } = useCustomQuery<Series[]>(
        ["studies", currentStudyId as string, "series"],
        () => getSeriesOfStudy(currentStudyId as string),
        { enabled: !!currentStudyId }
    );

    const { mutate: mutateModifyStudy } = useCustomMutation<OrthancResponse, { id: string, payload: StudyPayload }>(
        ({ id, payload }) => modifyStudy(id, payload),
        [['studies'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Study updated successfully");
                setEditingStudyId(null);
            },
        }
    );

    const { mutate: mutateModifySeries } = useCustomMutation<OrthancResponse, { id: string, payload: SeriesPayload }>(
        ({ id, payload }) => modifySeries(id, payload),
        [['series'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Series updated successfully");
                setEditingSeriesId(null);
            },
        }
    );

    const { mutate: mutateDeleteStudy } = useCustomMutation<void, { id: string }>(
        ({ id }) => deleteStudy(id),
        [['studies'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Study deleted successfully");
                setCurrentStudyId(null);
            },
        }
    );

    const { mutate: mutateDeleteSeries } = useCustomMutation<void, { id: string }>(
        ({ id }) => deleteSeries(id),
        [['series'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Series deleted successfully");
                // Refresh the list of series
                if (currentStudyId) {
                    getSeriesOfStudy(currentStudyId);
                }
            },
        }
    );

    const handleEditStudy = (study: any) => {
        console.log("Opening edit modal for study:", study);
        if (study && study.id) {
            setEditingStudyId(study.id);
            refetchStudyDetails();
        } else {
            console.error("Invalid study object or missing id:", study);
        }
    };

    const handleEditSeries = (series: Series) => {
        console.log("Opening edit modal for series:", series,series.id);
        if (series && series.id) {
            console.log("Editing series:", series);
            setEditingSeriesId(series.id);
            refetchSeriesDetails();
        } else {
            console.error("Invalid series object or missing id:", series);
        }
    };

    const handleDeleteStudy = async (study: StudyMainDicomTags) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this study:
                <span className="text-xl not-italic font-bold text-primary">{study.studyId}?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeleteStudy({ id: study.studyId ?? "" });
        }
    };

    const handleDeleteSeries = async (series: Series) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this series:
                <span className="text-xl not-italic font-bold text-primary">{series.id}?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeleteSeries({ id: series.id });
        }
    };

    const handleStudyAction = (action: string, study: StudyMainDicomTags) => {
        console.log("handleStudyAction called with action:", action, "and study:", study);
        switch (action) {
            case 'edit':
                handleEditStudy(study);
                break;
            case 'delete':
                handleDeleteStudy(study);
                break;
            default:
                console.log(`Unhandled action: ${action}`);
        }
    };

    const handleSeriesAction = (action: string, series: Series) => {
        console.log("handleSeriesAction called with action:", action, "and series:", series);
        switch (action) {
            case 'edit':
                console.log("Editing series:", series);
                handleEditSeries(series);
                break;
            case 'delete':
                handleDeleteSeries(series);
                break;
            default:
                console.log(`Unhandled action: ${action}`);
        }
    };

    const handleStudyEditSubmit = ({ id, payload }: EditModalSubmitParams<StudyPayload>) => {
        console.log("handleStudyEditSubmit called with studyId:", id, "and payload:", payload);
        mutateModifyStudy({ id, payload });
    };

    const handleSeriesEditSubmit = ({ id, payload }: EditModalSubmitParams<SeriesPayload>) => {
        console.log("handleSeriesEditSubmit called with seriesId:", id, "and payload:", payload);
        mutateModifySeries({ id, payload });
    };

    const handleRowClick = (study: any) => {
        console.log("Row clicked:", study);
        setCurrentStudyId(study.id);
    };

    const handleCloseStudyModal = () => {
        setEditingStudyId(null);
    };

    const handleCloseSeriesModal = () => {
        setEditingSeriesId(null);
    };

    return (
        <div className={`${currentStudyId ? 'grid grid-cols-1 gap-y-3 xl:grid-cols-2 xl:gap-x-2' : 'grid grid-cols-1'}`}>
            <StudyTable
                studies={patient.getStudies()}
                onRowClick={handleRowClick}
                onActionClick={handleStudyAction}
            />
            {seriesByStudy && seriesByStudy.length > 0 && (
                <SeriesTable 
                    series={seriesByStudy} 
                    onActionClick={handleSeriesAction}
                />
            )}
            {editingStudyId && editingStudyDetails && !isLoadingStudyDetails && (
                <EditModal<Study, StudyPayload>
                    title="Edit Study"
                    data={editingStudyDetails}
                    show={true}
                    onClose={handleCloseStudyModal}
                    onSubmit={handleStudyEditSubmit}
                    FormComponent={StudyEditForm}
                />
            )}
            {editingSeriesId && editingSeriesDetails && !isLoadingSeriesDetails && (
                <EditModal<Series, SeriesPayload>
                    title="Edit Series"
                    data={editingSeriesDetails}
                    show={true}
                    onClose={handleCloseSeriesModal}
                    onSubmit={handleSeriesEditSubmit}
                    FormComponent={SeriesEditForm}
                />
            )}
        </div>
    );
};

export default StudiesManager;