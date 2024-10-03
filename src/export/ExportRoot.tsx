import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ExportStudyTable from "./ExportStudyTable";
import ExportSeriesTable from "./ExportSeriesTable";
import { RiDownload2Line as DownloadIcon } from "react-icons/ri";
import { Button, Card, CardHeader, CardBody, CardFooter } from "../ui";
import { Colors, Study, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import DropdownButton from "../ui/menu/DropDownButton";
import { getModalities, getPeers } from "../services";
import { exportResourcesId } from "../services/export";
import { flushExportList } from "../reducers/ExportSlice";
import { storeToModality } from "../services/modalities";
import ProgressJobs from "../query/ProgressJobs";
import { sendResourcesToPeer } from "../services/peers";

const ExportRoot = () => {
    const { toastSuccess, updateExistingToast } = useCustomToast();
    const dispatch = useDispatch();
    const exportSeriesList = useSelector((state: RootState) => state.export.series);
    const exportStudyList = useSelector((state: RootState) => state.export.studies);

    const [currentStudyId, setCurrentStudyId] = useState(null);
    const [storeJobId, setStoreJobId] = useState(null);
    const [sendPeerJobId, setsendPeerJobId] = useState(null);

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
            undefined
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

    const downloadOptions = [
        {
            label: "Dicomdir",
            icon: <DownloadIcon />,
            color: "green",
            action: () => handleDownload(false),
        },
        {
            label: "Hierarchical",
            icon: <DownloadIcon />,
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
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={"Export Resources"}
            />
            <CardBody color={Colors.almond}>
                <div className="flex flex-col">
                    <ExportStudyTable onClickStudy={handleClickStudy} studies={Object.values(exportStudyList)} />
                    <ExportSeriesTable series={series} />
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center flex-grow gap-3">
                <div className="flex justify-center w-4/5 gap-3">
                    <DropdownButton row={null} buttonText="Download" options={downloadOptions} />
                    <DropdownButton row={null} buttonText="Send To Modality" options={modalitiesOptions} />
                    {storeJobId && <ProgressJobs size={50} jobId={storeJobId} />}
                    <DropdownButton row={null} buttonText="Send To Peer" options={peersOptions} />
                    {sendPeerJobId && <ProgressJobs size={50} jobId={sendPeerJobId} />}
                    <Button className="text-white bg-cyan-700" disabled>
                        Send To GaelO
                    </Button>
                </div>
                <div className="flex justify-end w-1/5 gap-3">
                    <Button color={Colors.secondary}>Download as CSV</Button>
                    <Button onClick={handleClearList} color={Colors.warning}>
                        Empty List
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ExportRoot;