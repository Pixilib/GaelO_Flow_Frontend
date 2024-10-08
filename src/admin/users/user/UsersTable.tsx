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
      accessorKey: 'email',
      enableColumnFilters: true,
    },
    {
      header: 'FirstName',
      accessorKey: 'firstname',
      enableColumnFilters: true,
    },
    {
      header: 'Lastname',
      accessorKey: 'lastname',
      enableColumnFilters: true,
    },
    {
      header: 'Role',
      accessorKey: 'role.name',
      enableColumnFilters: true,
    },
    {
      header: 'Action',
      cell({ row }: { row: any }) {
        const user = row.original;

        return (
          <div className="flex justify-center gap-2">
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
    <div className="pb-6 mx-5 mt-4">
      <Table
        data={data}
        columns={columns}
        headerColor={Colors.white} 
        headerTextSize="xs"  
        className="bg-gray-100"
        enableColumnFilters
        enableSorting
      />
    </div>
  );
}

export default UsersTable;
