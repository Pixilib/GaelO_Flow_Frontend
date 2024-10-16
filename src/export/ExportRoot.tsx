import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse"
import { RootState } from "../store";
import ExportStudyTable from "./ExportStudyTable";
import ExportSeriesTable from "./ExportSeriesTable";
import { Button, Card, CardHeader, CardBody, CardFooter } from "../ui";
import { Colors, Study, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import DropdownButton from "../ui/menu/DropDownButton";
import { getModalities, getPeers } from "../services";
import { exportResourcesId } from "../services/export";
import { flushExportList } from "../reducers/ExportSlice";
import { storeToModality } from "../services/modalities";
import ProgressJobs from "../query/ProgressJobs";
import { sendResourcesToPeer } from "../services/peers";
import { GaeloIcon } from "../assets";
import { exportCsv } from "../utils/export";
import SelectTransferSyntax from "./SelectTransferSyntax";
import { Download } from "../icons";
import Empty from "../icons/Empty";


const ExportRoot = () => {
    const { toastSuccess, updateExistingToast, toastWarning } = useCustomToast();
    const dispatch = useDispatch();
    const exportSeriesList = useSelector((state: RootState) => state.export.series);
    const exportStudyList = useSelector((state: RootState) => state.export.studies);

    const [currentStudyId, setCurrentStudyId] = useState(null);
    const [storeJobId, setStoreJobId] = useState(null);
    const [sendPeerJobId, setsendPeerJobId] = useState(null);
    const [transferSyntax, setTrasferSyntax] = useState('None')

    const series = useMemo(() => {
        if (!currentStudyId) return [];
        return Object.values(exportSeriesList).filter((series) => series.parentStudy === currentStudyId);
    }, [currentStudyId, exportSeriesList]);

    const { data: modalities } = useCustomQuery(
        ["modalities"],
        () => getModalities()
    );

    const { data: peers } = useCustomQuery(
        ["peers"],
        () => getPeers()
    );

    const { mutate: storeMutate } = useCustomMutation(
        ({ modalityName, resources }) => storeToModality(modalityName, resources),
        [[]],
        {
            onSuccess: (jobId: string) => {
                setStoreJobId(jobId);
            },
        }
    );

    const { mutate: sendPeerMutate } = useCustomMutation(
        ({ peerName, resources }) => sendResourcesToPeer(peerName, resources),
        [[]],
        {
            onSuccess: (jobId: string) => {
                setsendPeerJobId(jobId);
            },
        }
    );

    const handleClickStudy = (study: Study) => {
        setCurrentStudyId(study.id);
    };

    const handleClearList = () => {
        dispatch(flushExportList());
    };

    const handleDownload = (hierarchical: boolean) => {
        const id = toastSuccess("Download started");
        const seriesIds = Object.values(exportSeriesList).map((series) => series.id);
        exportResourcesId(
            seriesIds,
            (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"),
            undefined,
            hierarchical,
            transferSyntax != "None" ? transferSyntax : undefined
        );
    };

    const handleExportToModality = (modalityName: string) => {
        const resources = Object.values(exportSeriesList).map((series) => series.id);
        storeMutate({ modalityName, resources });
    };

    const handleExportToPeer = (peerName: string) => {
        const resources = Object.values(exportSeriesList).map((series) => series.id);
        sendPeerMutate({ peerName, resources });
    };

    const handleDownloadCsv = () => {
        const series = Object.values(exportSeriesList)
        if (series.length === 0) {
            toastWarning("Empty export list");
            return;
        }

        const exportData = series.map(series => {
            const study = exportStudyList[series.parentStudy]
            return {
                ...study.patientMainDicomTags,
                ...study.mainDicomTags,
                ...series.mainDicomTags,
                numberOfInstances: series.instances.length,
                orthancSeriesId: series.id,
                orthancStudyId: series.parentStudy,
                orthancPatientId: study.parentPatient
            }
        })
        const csvString = Papa.unparse(exportData, {})
        exportCsv(csvString, '.csv', 'export-list.csv')
    }

    const downloadOptions = [
        {
            label: "Dicomdir",
            icon: <Download />,
            color: "green",
            action: () => handleDownload(false),
        },
        {
            label: "Hierarchical",
            icon: <Download />,
            color: "green",
            action: () => handleDownload(true),
        },
    ];

    const modalitiesOptions = useMemo(() => {
        return modalities?.map((modality) => {
            return {
                label: modality.name,
                action: () => handleExportToModality(modality.name),
            };
        }) ?? [];
    }, [modalities]);

    const peersOptions = useMemo(() => {
        return peers?.map((peer) => {
            return {
                label: peer.name,
                action: () => handleExportToPeer(peer.name),
            };
        }) ?? [];
    }, [peers]);

    return (
        <Card>
            <CardHeader
                color={Colors.primary}
            >
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">Export Ressources</div>
                    <div className="flex justify-end w-1/5 gap-3 p-3">

                        <Button
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group">
                            <Download
                                onClick={handleDownloadCsv}
                                className="text-xl text-primary group-hover:text-white" />
                        </Button>

                        <Button
                            onClick={handleClearList}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group">
                            <Empty
                                className="text-xl text-bol text-primary group-hover:text-white" />
                        </Button>
                        <SelectTransferSyntax 
                            value={transferSyntax} 
                            onChange={(value) => setTrasferSyntax(value)} 
                        />

                    </div>

                </div>
            </CardHeader>
            <CardBody color={Colors.almond} className="overflow-auto">
                <div className="flex flex-col space-x-4 md:flex-row">
                    <div className="flex-1 mb-4">
                        <ExportStudyTable
                            onClickStudy={handleClickStudy}
                            studies={Object.values(exportStudyList)} />
                            
                        <ExportSeriesTable series={series} />
                    </div>
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center flex-grow gap-3">
                <div className="flex justify-center w-4/5 gap-3">
                    <DropdownButton
                        row={null}
                        buttonText="Download"
                        options={downloadOptions} />
                    <DropdownButton
                        row={null}
                        buttonText="Send To Modality"
                        options={modalitiesOptions} />
                    {storeJobId && <ProgressJobs size={50} jobId={storeJobId} />}
                    <DropdownButton
                        row={null}
                        buttonText="Send To Peer"
                        options={peersOptions} />
                    {sendPeerJobId && <ProgressJobs size={50} jobId={sendPeerJobId} />}
                    <Button
                        color={Colors.blueCustom}
                        className="text-white bg-cyan-700" disabled>
                        Send to <GaeloIcon className="ml-1" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );


};

export default ExportRoot;
