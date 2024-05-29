import { BsTrashFill as Delete } from "react-icons/bs";
import { Table } from "../../ui";
import { Colors } from "../../utils";
import { ColumnDef } from "@tanstack/react-table";



type LabelsTableProps = {
    data: { id: number; label: string }[];
    onDelete: (label: string) => void;
}

const LabelsTable = ({ data, onDelete }: LabelsTableProps) => {
    console.log({ data })

    const columns: ColumnDef<{ id: number; label: string }>[] = [
        {
            header: 'Label',
            accessorKey: 'label',
            cell: ({ getValue }) => {
                // Log de la valeur de la cellule
                const value = getValue() as string;
                console.log('Cell value:', value);
                return <span>{value}</span>;
            }
        },
        {
            header: 'Delete',
            cell({ row }: { row: any }) {
                const label = row.original.label;
                console.log('Row label for delete:', label);
                return (
                        <Delete
                            color="#FF0000"
                            size={"1.4rem"}
                            className="transition duration-70 hover:scale-110"
                            onClick={() => onDelete(label)}
                        />
                )
            },
        },
    ];

    console.log(columns)
    return (
        <>
            <Table
                columns={columns}
                data={data}
                headerColor={Colors.almond}
                enableColumnFilters
                enableSorting
            />
        </>
    );
}
export default LabelsTable;