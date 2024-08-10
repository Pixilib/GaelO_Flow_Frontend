import { Table, BooleanIcon, EditButton, DeleteButton } from "../../../ui";
import { Colors } from "../../../utils";

type RolesTableProps = {
  data: any[];
  onEdit: (roleName: string) => void;
  onDelete: (roleName: string) => void;
};

const RolesTable = ({ data = [], onEdit, onDelete }: RolesTableProps) => {
  const columns = [
    {
      header: "Role",
      accessorKey: "name",
      enableColumnFilters: true,
    },
    {
      header: "Export",
      accessorKey: "export",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.export, size: "1.4rem" }),
    },
    {
      header: "ReadAll",
      accessorKey: "readAll",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.readAll, size: "1.4rem" }),
    },
    {
      header: "Anonymize",
      accessorKey: "anonymize",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.anonymize, size: "1.4rem" }),
    },
    {
      header: "Import",
      accessorKey: "import",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.import, size: "1.4rem" }),
    },
    {
      header: "Query",
      accessorKey: "query",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.query, size: "1.4rem" }),
    },
    {
      header: "AutoQuery",
      accessorKey: "autoQuery",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.autoQuery, size: "1.4rem" }),
    },
    {
      header: "Delete",
      accessorKey: "delete",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.delete, size: "1.4rem" }),
    },
    {
      header: "Admin",
      accessorKey: "admin",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.admin, size: "1.4rem" }),
    },
    {
      header: "Modify",
      accessorKey: "modify",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.modify, size: "1.4rem" }),
    },
    {
      header: "CdBurner",
      accessorKey: "cdBurner",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.cdBurner, size: "1.4rem" }),
    },
    {
      header: "AutoRouting",
      accessorKey: "autoRouting",
      enableColumnFilters: true,
      cell: ({ row }: { row: any }) =>
        BooleanIcon({ value: row.original.autoRouting, size: "1.4rem" }),
    },
    {
      header: "Action",
      cell({ row }: { row: any }) {
        const roleName = row.original.Name;
        return (
          <div className="flex justify-center gap-7">
            <EditButton onClick={() => onEdit(roleName)} />
            <DeleteButton onClick={() => onDelete(roleName)} />
          </div>
        );
      },
    },
  ];
  return (
    <div className="mx-5">
      <Table
        data={data}
        columns={columns}
        headerColor={Colors.white}
        headerTextSize="xs"
        className="bg-gray-100"
        enableSorting
        pinFirstColumn={true}
        pinLastColumn={true}
      />
    </div>
  );
};
export default RolesTable;
