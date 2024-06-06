import { BsPencilFill as Edit, BsTrashFill as Delete } from "react-icons/bs";

import { Colors, useModal, User } from "../../../utils";
import { Table,ConfirmModal } from "../../../ui";

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
        const { dialogRef, openDialog, closeDialog } = useModal();

        return (
          <div className="flex justify-center gap-7">
            <Edit
              size={'1.3rem'}
              className="transition duration-70 hover:scale-110"
              color="#FF9500"
              onClick={() => onEdit(user)}
            />
            <Delete
              size={'1.3rem'}
              className="transition duration-70 hover:scale-110"
              color="#FF0000"
              onClick={openDialog}
            />
            <ConfirmModal
              dialogRef={dialogRef}
              message={
                <div className="italic">
                  Are you sure you want to delete this user: 
                  <span className="text-xl not-italic font-bold text-primary"> {user.Firstname} {user.LastName} ?</span> 
                </div>
              }
              onConfirm={() => onDelete(user)}
              className="bg-zinc-200"
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
