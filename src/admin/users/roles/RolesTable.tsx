import { BsPencilFill as Edit, BsTrashFill as Delete } from "react-icons/bs";
import { Table, BooleanIcon, ConfirmModal } from "../../../ui";
import { Colors, useModal } from "../../../utils";

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
                const { dialogRef, openDialog, closeDialog } = useModal();
                return (
                    <div className="flex justify-center gap-7">
                        <Edit size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DFB520"
                            onClick={() => onEdit?.(roleName)}
                        />
                        <Delete size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={openDialog}
                        />
                        <ConfirmModal
                            dialogRef={dialogRef}
                            closeDialog={closeDialog}
                            message={`Are you sure you want to delete this rôle: ${roleName} ?`}
                            onConfirm={() => onDelete(roleName)}
                            className=""
                        />

                    </div>
                )
            }
        }
    ]
    return (
        <div className="mx-5 mt-4">
            <Table
                data={data}
                columns={columns}
                headerColor={Colors.almond}
                enableSorting
                headerTextSize={"xs"}
                pageSize={2}
                pinFirstColumn={true}
                pinLastColumn={true}
            />
        </div>
    );
};
export default RolesTable;