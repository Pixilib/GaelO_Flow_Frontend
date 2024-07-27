// import React, { useState, useCallback, useEffect } from "react";
// import { useCustomQuery, useCustomMutation, useCustomToast } from "../utils";
// import { getSeriesOfStudy, deleteStudy, modifyStudy, getStudies, getSeries, modifySeries, deleteSeries } from "../services/orthanc";
// import Patient from "../model/Patient";
// import StudyTable from "./studies/StudyTable";
// import SeriesTable from "./series/SeriesTable";
// import { OrthancResponse, Series, Study, StudyMainDicomTags, StudyPayload, SeriesPayload } from '../utils/types';
// import { useConfirm } from "../services";
// import EditModal, { EditModalSubmitParams } from "../ui/EditModal";
// import StudyEditForm from "./studies/StudyEditForm";
// import SeriesEditForm from "./series/SeriesEditForm";
// import { setJob, resetJob } from '../reducers/JobSlice';
// import { useDispatch } from "react-redux";
// import { useContent } from "../services/useContent";

// const StudiesManager: React.FC<{ patient: Patient }> = ({ patient }) => {
//     console.log('StudiesManager rendered with patient:', patient);

//     const dispatch = useDispatch();
//     const { executeSearch } = useContent();
//     const [editingStudyId, setEditingStudyId] = useState<string | null>(null);
//     const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
//     const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);

//     const { toastSuccess, toastError } = useCustomToast();
//     const { confirm } = useConfirm();

//     useEffect(() => {
//         console.log('editingStudyId changed:', editingStudyId);
//     }, [editingStudyId]);

//     const { data: editingStudyDetails, isLoading: isLoadingStudyDetails, refetch: refetchStudyDetails } = useCustomQuery<Study>(
//         ['studies', editingStudyId ?? ''],
//         () => {
//             console.log('Fetching study details for id:', editingStudyId);
//             if (!editingStudyId) {
//                 console.error('Attempted to fetch study details with null id');
//                 return Promise.reject(new Error('Invalid study ID'));
//             }
//             return getStudies(editingStudyId);
//         },
//         {
//             enabled: !!editingStudyId,
//             onError: (error) => {
//                 console.error("Error fetching study details:", error);
//                 toastError("Failed to load study details");
//                 setEditingStudyId(null);
//             },
//         }
//     );

//     console.log('editingStudyDetails:', editingStudyDetails, 'isLoadingStudyDetails:', isLoadingStudyDetails);

//     const { data: editingSeriesDetails, isLoading: isLoadingSeriesDetails, refetch: refetchSeriesDetails } = useCustomQuery<Series>(
//         ['series', editingSeriesId ?? ''],
//         () => getSeries(editingSeriesId as string),
//         {
//             enabled: !!editingSeriesId,
//             onError: (error) => {
//                 console.error("Error fetching series details:", error);
//                 toastError("Failed to load series details");
//                 setEditingSeriesId(null);
//             },
//         }
//     );

//     const { data: seriesByStudy, refetch: refetchSeriesByStudy } = useCustomQuery<Series[]>(
//         ["studies", selectedStudyId as string, "series"],
//         () => getSeriesOfStudy(selectedStudyId as string),
//         { enabled: !!selectedStudyId }
//     );

//     // const { mutate: mutateModifyStudy } = useCustomMutation<OrthancResponse, { id: string, payload: StudyPayload }>(
//     //     ({ id, payload }) => modifyStudy(id, payload),
//     //     [['studies'], ['jobs']],
//     //     {
//     //         onSuccess: (data, variables) => {
//     //             console.log("Study updated successfully:", data, variables);
//     //             dispatch(setJob({ jobId: data.id, entityId: variables.id, entityType: 'study' }));
//     //         },
//     //     }
//     // );


//     const { mutate: mutateModifyStudy } = useCustomMutation<OrthancResponse, { id: string, payload: StudyPayload }>(
//         ({ id, payload }) => modifyStudy(id, payload),
//         [['studies'], ['jobs']],
//         {
//             onSuccess: (data, variables) => {
//                 console.log("Study updated successfully:", data, variables);
//                 dispatch(setJob({ jobId: data.id, entityId: variables.id, entityType: 'study' }));
//                 // Update the patient's study
//                 const updatedStudy = patient.getStudy(variables.id);
//                 if (updatedStudy) {
//                     Object.assign(updatedStudy, variables.payload.replace);
//                 }
//                 executeSearch(); // This will trigger a re-render with updated data
//             },
//         }
//     );

//     const { mutate: mutateModifySeries } = useCustomMutation<OrthancResponse, { id: string, payload: SeriesPayload }>(
//         ({ id, payload }) => modifySeries(id, payload),
//         [['series'], ['jobs']],
//         {
//             onSuccess: (data, variables) => {
//                 dispatch(setJob({ jobId: data.id, entityId: variables.id, entityType: 'series' }));
//             },
//         }
//     );

//     const { mutate: mutateDeleteStudy } = useCustomMutation<void, { id: string }>(
//         ({ id }) => deleteStudy(id),
//         [['studies'], ['jobs']],
//         {
//             onSuccess: () => {
//                 toastSuccess("Study deleted successfully");
//                 setSelectedStudyId(null);
//                 executeSearch();
//             },
//         }
//     );

//     const { mutate: mutateDeleteSeries } = useCustomMutation<void, { id: string }>(
//         ({ id }) => deleteSeries(id),
//         [['series'], ['jobs']],
//         {
//             onSuccess: () => {
//                 toastSuccess("Series deleted successfully");
//                 refetchSeriesByStudy();
//             },
//         }
//     );

//     const handleEditStudy = (study: Study) => {
//         console.log("Opening edit modal for study:", study);
//         if (study && study.id) {
//             setEditingStudyId(study.id);
//             console.log('Setting editingStudyId:', study.id);
//         } else {
//             console.error("Invalid study object or missing id:", study);
//         }
//     };

//     const handleEditSeries = (series: Series) => {
//         console.log("Opening edit modal for series:", series);
//         if (series && series.id) {
//             setEditingSeriesId(series.id);
//         } else {
//             console.error("Invalid series object or missing id:", series);
//         }
//     };

//     const handleDeleteStudy = async (study: StudyMainDicomTags) => {
//         console.log("Attempting to delete study:", study);
//         const confirmContent = (
//             <div className="italic">
//                 Are you sure you want to delete this study:
//                 <span className="text-xl not-italic font-bold text-primary">{study.studyId}?</span>
//             </div>
//         );
//         if (await confirm({ content: confirmContent })) {
//             mutateDeleteStudy({ id: study.studyId ?? "" });
//         }
//     };
//     const handleDeleteSeries = async (series: Series) => {
//         console.log("Attempting to delete series:", series);
//         const confirmContent = (
//             <div className="italic">
//                 Are you sure you want to delete this series:
//                 <span className="text-xl not-italic font-bold text-primary">{series.id}?</span>
//             </div>
//         );
//         if (await confirm({ content: confirmContent })) {
//             mutateDeleteSeries({ id: series.id });
//         }
//     }

//     const handleStudyAction = (action: string, study: StudyMainDicomTags) => {
//         console.log('handleStudyAction called with:', action, study);
//         switch (action) {
//             case 'edit':
//                 handleEditStudy(study as any);
//                 break;
//             case 'delete':
//                 handleDeleteStudy(study);
//                 break;
//             default:
//                 console.log(`Unhandled action: ${action}`);
//         }
//     }

//     const handleSeriesAction = (action: string, series: Series) => {
//         console.log('handleSeriesAction called with:', action, series);
//         switch (action) {
//             case 'edit':
//                 handleEditSeries(series);
//                 break;
//             case 'delete':
//                 handleDeleteSeries(series);
//                 break;
//             default:
//                 console.log(`Unhandled action: ${action}`);
//         }
//     }

//     const handleStudyEditSubmit = ({ id, payload }: EditModalSubmitParams<StudyPayload>) => {
//         console.log('handleStudyEditSubmit called with:', id, payload);
//         mutateModifyStudy({ id, payload });
//     }

//     const handleSeriesEditSubmit = ({ id, payload }: EditModalSubmitParams<SeriesPayload>) => {
//         console.log('handleSeriesEditSubmit called with:', id, payload);
//         mutateModifySeries({ id, payload });
//     }

//     const handleRowClick =(study: any) => {
//         console.log('Row clicked:', study);
//         setSelectedStudyId(study.id);
//     }

//     const handleCloseStudyModal = () => {
//         console.log('Closing study modal');
//         setEditingStudyId(null);
//         dispatch(resetJob());
//         executeSearch();
//     }

//     const handleCloseSeriesModal = () => {
//         console.log('Closing series modal');
//         setEditingSeriesId(null);
//         dispatch(resetJob());
//         refetchSeriesByStudy();
//     }

//     return (
//         <div className={`${selectedStudyId ? 'grid grid-cols-1 gap-y-3 xl:grid-cols-2 xl:gap-x-2' : 'grid grid-cols-1'}`}>
//             <StudyTable
//                 studies={patient.getStudies()}
//                 onRowClick={handleRowClick}
//                 onActionClick={handleStudyAction}
//             />
//             {selectedStudyId && seriesByStudy && seriesByStudy.length > 0 && (
//                 <SeriesTable
//                     series={seriesByStudy}
//                     onActionClick={handleSeriesAction}
//                 />
//             )}
//             {editingStudyId && editingStudyDetails && !isLoadingStudyDetails && (
//                 <EditModal<Study, StudyPayload>
//                     title="Edit Study"
//                     data={editingStudyDetails}
//                     show={true}
//                     onClose={handleCloseStudyModal}
//                     onSubmit={handleStudyEditSubmit}
//                     FormComponent={StudyEditForm}
//                 />
//             )}
//             {editingSeriesId && editingSeriesDetails && !isLoadingSeriesDetails && (
//                 <EditModal<Series, SeriesPayload>
//                     title="Edit Series"
//                     data={editingSeriesDetails}
//                     show={true}
//                     onClose={handleCloseSeriesModal}
//                     onSubmit={handleSeriesEditSubmit}
//                     FormComponent={SeriesEditForm}
//                 />
//             )}
//         </div>
//     );
// };

// export default React.memo(StudiesManager);

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
import { setJob, resetJob } from '../reducers/JobSlice';
import { useDispatch } from "react-redux";
import { useContent } from "../services/useContent";

const StudiesManager: React.FC<{ patient: Patient }> = ({ patient }) => {
    const dispatch = useDispatch();
    const { executeSearch } = useContent();
    const [editingStudyId, setEditingStudyId] = useState<string | null>(null);
    const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
    const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);

    const { toastSuccess, toastError } = useCustomToast();
    const { confirm } = useConfirm();
    
    console.log('StudiesManager rendered with patient:', patient);
    console.log('Patient studies:', patient.getStudies());

    const { data: editingStudyDetails, isLoading: isLoadingStudyDetails } = useCustomQuery<Study>(
        ['studies', editingStudyId ?? ''],
        () => editingStudyId ? getStudies(editingStudyId) : Promise.reject('No study ID'),
        {
            enabled: !!editingStudyId,
            onError: (error) => {
                console.error("Error fetching study details:", error);
                toastError("Failed to load study details");
                setEditingStudyId(null);
            },
        }
    );

    const { data: editingSeriesDetails, isLoading: isLoadingSeriesDetails } = useCustomQuery<Series>(
        ['series', editingSeriesId ?? ''],
        () => editingSeriesId ? getSeries(editingSeriesId) : Promise.reject('No series ID'),
        {
            enabled: !!editingSeriesId,
            onError: (error) => {
                console.error("Error fetching series details:", error);
                toastError("Failed to load series details");
                setEditingSeriesId(null);
            },
        }
    );

    const { data: seriesByStudy, refetch: refetchSeriesByStudy } = useCustomQuery<Series[]>(
        ["studies", selectedStudyId as string, "series"],
        () => selectedStudyId ? getSeriesOfStudy(selectedStudyId) : Promise.reject('No study selected'),
        { enabled: !!selectedStudyId }
    );

    const { mutate: mutateModifyStudy } = useCustomMutation<OrthancResponse, { id: string, payload: StudyPayload }>(
        ({ id, payload }) => modifyStudy(id, payload),
        [['studies'], ['jobs']],
        {
            onSuccess: (data, variables) => {
                dispatch(setJob({ jobId: data.id, entityId: variables.id, entityType: 'study' }));
                executeSearch(); // Repopule le modèle entier
            },
        }
    );

    const { mutate: mutateModifySeries } = useCustomMutation<OrthancResponse, { id: string, payload: SeriesPayload }>(
        ({ id, payload }) => modifySeries(id, payload),
        [['series'], ['jobs']],
        {
            onSuccess: (data, variables) => {
                dispatch(setJob({ jobId: data.id, entityId: variables.id, entityType: 'series' }));
                executeSearch(); // Repopule le modèle entier
            },
        }
    );

    const { mutate: mutateDeleteStudy } = useCustomMutation<void, { id: string }>(
        ({ id }) => deleteStudy(id),
        [['studies'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Study deleted successfully");
                setSelectedStudyId(null);
            },
        }
    );

    const { mutate: mutateDeleteSeries } = useCustomMutation<void, { id: string }>(
        ({ id }) => deleteSeries(id),
        [['series'], ['jobs']],
        {
            onSuccess: () => {
                toastSuccess("Series deleted successfully");
                refetchSeriesByStudy();
            },
        }
    );

    const handleEditStudy = (study: Study) => setEditingStudyId(study.id);
    const handleEditSeries = (series: Series) => setEditingSeriesId(series.id);

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
        action === 'edit' ? handleEditStudy(study as any) : handleDeleteStudy(study);
    };

    const handleSeriesAction = (action: string, series: Series) => {
        action === 'edit' ? handleEditSeries(series) : handleDeleteSeries(series);
    };

    const handleStudyEditSubmit = ({ id, payload }: EditModalSubmitParams<StudyPayload>) => mutateModifyStudy({ id, payload });
    const handleSeriesEditSubmit = ({ id, payload }: EditModalSubmitParams<SeriesPayload>) => mutateModifySeries({ id, payload });

    const handleRowClick = (study: any) => setSelectedStudyId(study.id);

    const handleCloseStudyModal = () => {
        setEditingStudyId(null);
        dispatch(resetJob());
    };

    const handleCloseSeriesModal = () => {
        setEditingSeriesId(null);
        dispatch(resetJob());
        refetchSeriesByStudy();
    };

    return (
        <div className={`${selectedStudyId ? 'grid grid-cols-1 gap-y-3 xl:grid-cols-2 xl:gap-x-2' : 'grid grid-cols-1'}`}>
            <StudyTable
                studies={patient.getStudies()}
                onRowClick={handleRowClick}
                onActionClick={handleStudyAction}
            />

            {selectedStudyId && seriesByStudy && seriesByStudy.length > 0 && (
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

export default React.memo(StudiesManager);