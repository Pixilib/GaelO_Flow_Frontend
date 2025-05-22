import { Colors, useCustomQuery } from "../../utils";
import { Button, Table, Toggle } from "../../ui";
import { getAutoRoutingItems } from "../../services/autorouting";
import { AutoRoutingItems } from "../../utils/types";
import { Check, Cloud } from "../../icons";

type AutoRoutingTableProps = {
    data: AutoRoutingItems[];
}

const AutoRoutingTable = ({ data }: AutoRoutingTableProps) => {
    const columns = [
        {
            header: "Activated",
            cell({ row }: { row: any }) {
                return (
                    <Toggle
                        onChange={() => { }}
                        checked={row.original.Activated}
                    />
                )
            }
        },
        {
            header: "Name",
            accessorKey: "Name",
        },
        {
            header: "Event Type",
            accessorKey: "EventType",
        },
        {
            header: "Rule Condition",
            accessorKey: "Router.RuleCondition",
        },
        {
            header: "Rules",
            cell({ row }: { row: any }) {
                return (
                    <Button
                        className="h-13 w-32 text-sm"
                        onClick={() => { }}
                        color={Colors.primary}
                        children={<p>See Rules</p>}
                    />
                );
            }
        },
        {
            header: "Destinations",
            cell({ row }: { row: any }) {
                return (
                    <Button
                        className="h-13 w-32 text-sm"
                        onClick={() => { }}
                        color={Colors.primary}
                        children={<p>See Destinations</p>}
                    />
                );
            }
        },
    ]

    return (
        <Table
            headerColor={Colors.light}
            columns={columns}
            data={data}
            className="bg-gray-100"
            enableSorting
        />
    );
}

export default AutoRoutingTable;