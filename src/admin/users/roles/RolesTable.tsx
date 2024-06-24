import { Table, BooleanIcon, EditButton, DeleteButton } from "../../../ui";
import { Colors } from "../../../utils";

type RolesTableProps = {
    data: any[];
    onEdit: (roleName: string) => void;
    onDelete: (roleName: string) => void;
}
const RolesTable = ({ data = [], onEdit, onDelete }: RolesTableProps) => {

    const columns = [
        {
            header: 'Role',
            accessorKey: 'Name',
            enableColumnFilters: true,
        },
        {
            header: 'Export',
            accessorKey: 'Export',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Export, size: '1.4rem' }),
        },
        {
            header: 'ReadAll',
            accessorKey: 'ReadAll',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.ReadAll, size: '1.4rem' }),
        },
        {
            header: 'Anonymize',
            accessorKey: 'Anonymize',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Anonymize, size: '1.4rem' }),
        },
        {
            header: 'Import',
            accessorKey: 'Import',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) =>
                BooleanIcon({ value: row.original.Import, size: '1.4rem' }),
        },
        {
            header: 'Query',
            accessorKey: 'Query',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Query, size: '1.4rem' }),
        },
        {
            header: 'AutoQuery',
            accessorKey: 'AutoQuery',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.AutoQuery, size: '1.4rem' }),
        },
        {
            header: 'Delete',
            accessorKey: 'Delete',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Delete, size: '1.4rem' }),
        },
        {
            header: 'Admin',
            accessorKey: 'Admin',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Admin, size: '1.4rem' }),
        },
        {
            header: 'Modify',
            accessorKey: 'Modify',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Modify, size: '1.4rem' }),
        },
        {
            header: 'CdBurner',
            accessorKey: 'CdBurner',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.CdBurner, size: '1.4rem' }),
        },
        {
            header: 'AutoRouting',
            accessorKey: 'AutoRouting',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.AutoRouting, size: '1.4rem' }),
        },
        {
            header: 'Action',
            cell({ row }: { row: any }) {
                const roleName = row.original.Name;
                return (
                    <div className="flex justify-center gap-7">
                        <EditButton onClick={() => onEdit(roleName)}/>
                        <DeleteButton onClick={() => onDelete(roleName)}/>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="mx-5">
            <Table
                data={data}
                columns={columns}
                headerColor={Colors.almond}
                enableSorting
                headerTextSize={"xs"}
                pinFirstColumn={true}
                pinLastColumn={true}
            />
        </div>
    );
};
export default RolesTable;