import { Colors, User } from "../../../utils";
import { Table, EditButton, DeleteButton } from "../../../ui";

type UsersProps = {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UsersTable = ({ data = [], onEdit, onDelete }: UsersProps) => {
  const columns = [
    {
      header: "Email",
      accessorKey: "email",
      enableColumnFilters: true,
    },
    {
      header: "FirstName",
      accessorKey: "firstname",
      enableColumnFilters: true,
    },
    {
      header: "Lastname",
      accessorKey: "lastname",
      enableColumnFilters: true,
    },
    {
      header: "Role",
      accessorKey: "role.name",
      enableColumnFilters: true,
    },
    {
      header: "Action",
      cell({ row }: { row: any }) {
        const user = row.original;

        return (
          <div className="flex justify-center gap-2">
            <div data-gaelo-flow="users-edit-line" >
              <EditButton onClick={() => onEdit(user)} />
            </div>
            <div data-gaelo-flow="users-delete-line">
              <DeleteButton onClick={() => onDelete(user)} />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div data-gaelo-flow="users-datatable" className="pb-6 mx-5 mt-4">
      <Table
        data={data}
        columns={columns}
        headerColor={Colors.white}
        headerTextSize="xs"
        className="bg-gray-100 dark:bg-slate-950 dark:text-white"
        enableColumnFilters
        enableSorting
        getRowClasses={() => "hover:bg-indigo-100 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700 hover:cursor-pointer"}
        />
    </div>
  );
};

export default UsersTable;
