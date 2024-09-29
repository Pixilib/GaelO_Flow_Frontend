import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ExportStudyTable from "./ExportStudyTable";
import ExportSeriesTable from "./ExportSeriesTable";
import { RiDownload2Line as DownloadIcon } from "react-icons/ri";
import { Button, Card, CardFooter } from "../ui";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import DropdownButton from "../ui/menu/DropDownButton";
import { getModalities, getPeers } from "../services";
import { useMemo } from "react";
import useToasts from "../services/useToasts";
import { exportResourcesId, exportRessource } from "../services/export";
import { flushExportList } from "../reducers/ExportSlice";

const ExportRoot = () => {

    const { toastSuccess, updateExistingToast } = useCustomToast()
    const dispatch = useDispatch();
    const exportSeriesList = useSelector((state: RootState) => state.export.series);
    const exportStudyList = useSelector((state: RootState) => state.export.studies);

    const { data: modalities } = useCustomQuery(
        ['modalities'],
        () => getModalities()
    )

    const { data: peers } = useCustomQuery(
        ['modalities'],
        () => getPeers()
    )

    const { } = useCustomMutation(

    )

    const handleClearList = () => {
        dispatch(flushExportList())
    }

    const handleDownload = (hierarchical: boolean) => {
        const id = toastSuccess("Download started")
        const seriesIds = Object.values(exportSeriesList).map((series) => series.id)
        exportResourcesId(seriesIds, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb"), undefined, hierarchical, undefined)
    }

    const handleExportToModality = (modalityName: string) => {

    }

    const downloadOptions = [
        {
            label: 'Dicomdir',
            icon: <DownloadIcon />,
            color: 'green',
            action: () => handleDownload(false)
        },
        {
            label: 'Hierarchical',
            icon: <DownloadIcon />,
            color: 'green',
            action: () => handleDownload(true)
        },
    ];

    const aetOptions = useMemo(() => {
        return modalities?.map((modality) => {
            return {
                label: modality.name,
                //icon: <DownloadIcon />,
                //color: 'green',
                action: () => handleExportToModality(modality.name)
            }
        }) ?? []
    }, [modalities])

    const peersOptions = useMemo(() => {
        return peers?.map((modality) => {
            return {
                label: modality.name,
                //icon: <DownloadIcon />,
                //color: 'green',
                action: () => handleExportToModality(modality.name)
            }
        }) ?? []
    }, [peers])

    return (
        <Card>
            <div className="flex flex-col">
                <ExportStudyTable studies={Object.values(exportStudyList)} />
                <ExportSeriesTable series={Object.values(exportSeriesList)} />
            </div>
            <div>
                <CardFooter color={Colors.light} className="flex flex-grow justify-center gap-3">
                    <div className="flex w-4/5 justify-center gap-3">
                        <DropdownButton
                            row={null}
                            buttonText="Download"
                            options={downloadOptions}
                        />
                        <DropdownButton
                            row={null}
                            buttonText="Send To Modality"
                            options={aetOptions}
                        />
                        <DropdownButton
                            row={null}
                            buttonText="Send To Peer"
                            options={peersOptions}
                        />
                        <Button
                            color={Colors.primary}
                            disabled
                        >
                            Send To GaelO
                        </Button>
                    </div>
                    <div className="flex w-1/5 justify-end gap-3">
                        <Button color={Colors.secondary}>Download as CSV</Button>
                        <Button
                            onClick={handleClearList}
                            color={Colors.warning}
                        >
                            Empty List
                        </Button>
                    </div>

                </CardFooter>
            </div>
        </Card>
    )
}

export default ExportRoot