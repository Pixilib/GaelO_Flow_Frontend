import { Colors, User } from "../../../utils";
import { Table, EditButton, DeleteButton  } from "../../../ui";

type UsersProps = {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersTable = ({ data = [], onEdit, onDelete }: UsersProps) => {
  const columns = [
    {
      header: 'Email',
      accessorKey: 'Email',
      enableColumnFilters: true,
    },
    {
      header: 'FirstName',
      accessorKey: 'Firstname',
      enableColumnFilters: true,
    },
    {
      header: 'Lastname',
      accessorKey: 'Lastname',
      enableColumnFilters: true,
    },
    {
      header: 'E-mail',
      accessorKey: 'Email',
      enableColumnFilters: true,
    },
    {
      header: 'Rôle',
      accessorKey: 'Role.Name',
      enableColumnFilters: true,
    },
    {
      header: 'Action',
      cell({ row }: { row: any }) {
        const user = row.original;

        return (
          <div className="flex justify-center gap-7">
            <EditButton
              onClick={() => onEdit(user)}
            />
            <DeleteButton
              onClick={()=> onDelete(user)}
            />

          </div>
        );
      }
    },
  ];

  return (
    <div className="mx-5 mt-4">
      <Table
        data={data}
        columns={columns}
        headerColor={Colors.almond}
        enableColumnFilters
        enableSorting
      />
    </div>
  );
}

export default UsersTable;
