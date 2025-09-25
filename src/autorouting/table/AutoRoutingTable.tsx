import { Colors } from "../../utils";
import { Button, Table, Toggle } from "../../ui";
import { AutoRoutingItems } from "../../utils/types";
import { Trash } from "../../icons";
import SeeRulesModal from "./SeeRulesModal";
import { useState } from "react";
import SeeDestinationModal from "./SeeDestinationModal";
import { useTranslation } from "react-i18next";

type AutoRoutingTableProps = {
    data: AutoRoutingItems[];
    onDelete: (id: number) => void;
    toggleActivated: (id: number, activate: boolean) => void;
}

const AutoRoutingTable = ({ data, onDelete, toggleActivated }: AutoRoutingTableProps) => {
    const [ itemIdToShow, setItemIdToShow ] = useState<number | null>(null);
    const [ showRulesModal, setShowRulesModal ] = useState(false);
    const [ showDestinationsModal, setShowDestinationsModal ] = useState(false);
    const {t} = useTranslation()

    const columns = [
        {
            header: t("autorouting.createAutoRooting.activated"),
            cell({ row }: { row: any }) {
                return (
                    <Toggle
                        onChange={() => toggleActivated(row.original.Id, !row.original.Activated)}
                        checked={row.original.Activated}
                    />
                )
            }
        },
        {
            header: t("autorouting.createAutoRooting.name"),
            accessorKey: "Name",
        },
        {
            header: t("autorouting.createAutoRooting.event-type"),
            accessorKey: "EventType",
        },
        {
            header: t("autorouting.createAutoRooting.rule-condition"),
            accessorKey: "Router.RuleCondition",
        },
        {
            header: t("autorouting.createAutoRooting.rules"),
            cell({ row }: { row: any }) {
                return (
                    <Button
                        className="h-13 w-32 text-sm"
                        onClick={() => {
                            setItemIdToShow(row.original.Id);
                            setShowRulesModal(true)
                        }}
                        color={Colors.primary}
                        children={<p>{t("autorouting.createAutoRooting.see-rules")}</p>}
                    />
                );
            }
        },
        {
            header: t("autorouting.createAutoRooting.destinations"),
            cell({ row }: { row: any }) {
                return (
                    <Button
                        className="h-13 w-32 text-sm"
                        onClick={() => {
                            setItemIdToShow(row.original.Id);
                            setShowDestinationsModal(true)
                        }}
                        color={Colors.primary}
                        children={<p>{t("autorouting.createAutoRooting.see-destinations")}</p>}
                    />
                );
            }
        },
        {
            header: t("autorouting.createAutoRooting.delete"),
            cell({ row }: { row: any }) {
                return (
                    <Button
                        onClick={() => onDelete(row.original.Id)}
                        color={Colors.danger}
                        children={
                            <Trash
                                size="1.3rem"
                                className="transition duration-70 hover:scale-110"
                                color={Colors.light}
                            />
                        }
                    />
                );
            }
        },
    ]

    return (
        <>
            <Table
                headerColor={Colors.light}
                columns={columns}
                data={data}
                className="bg-gray-100"
                enableSorting
            />
            <SeeRulesModal
                show={showRulesModal}
                onClose={() => {
                    setShowRulesModal(false)
                    setItemIdToShow(null);
                }}
                data={data?.find(item => item.Id === itemIdToShow)?.Router?.Rules}
            />
            <SeeDestinationModal
                show={showDestinationsModal}
                onClose={() => {
                    setShowDestinationsModal(false)
                    setItemIdToShow(null);
                }
                }
                data={data?.find(item => item.Id === itemIdToShow)?.Router?.Destinations}
            />
        </>
    );
}

export default AutoRoutingTable;