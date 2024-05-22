import { BsPencilFill as Edit, BsTrashFill as Delete } from "react-icons/bs";
import { Table, BooleanIcon } from "../../ui";
import { Colors } from "../../utils";

type RolesTableProps = {
    data: any[];
    onEdit?: (roleId: number) => void;
    onDelete?: (roleId: number) => void;
}
const RolesTable = ({ data = [], onEdit, onDelete }: RolesTableProps) => {

    const columns = [
        {
            header: 'Role',
            accessorKey: 'Name',
            enableColumnFilters: true,
        },
        {
            header: 'Import',
            accessorKey: 'Import',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => 
                BooleanIcon({ value: row.original.Import, size: '1.4rem' }),
        },
        {
            header: 'Anonymize',
            accessorKey: 'Anonymize',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Anonymize, size: '1.4rem' }),
        },
        {
            header: 'Export',
            accessorKey: 'Export',
            enableColumnFilters: true,
            cell: ({ row }: { row: any }) => BooleanIcon({ value: row.original.Export, size: '1.4rem' }),
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
                const roleId = row.original.Id;
                return (
                    <div className="flex justify-center gap-7">
                        <Edit size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DFB520"
                            onClick={() => onEdit?.(roleId)}
                        />
                        <Delete size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={() => onDelete?.(roleId)}
                        />
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <Table
                data={data}
                columns={columns}
                headerColor={Colors.almond}
                enableColumnFilters
                enableSorting
            />
        </div>
    );
};
export default RolesTable;