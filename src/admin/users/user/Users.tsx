import { useState } from "react";
import { deleteUser, getUsers } from "../../../services/users";
import { useConfirm } from "../../../services/ConfirmContextProvider";
import { useCustomMutation, useCustomQuery } from "../../../utils/reactQuery";
import { useCustomToast } from "../../../utils/toastify";
import { User } from "../../../utils/types"
import { Spinner } from "../../../ui";
import UsersTable from "./UsersTable";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";

type UsersProps = {
  className?: string;
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
};

const Users = ({ className, isCreating, setIsCreating }: UsersProps) => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const { data: users, isPending: isLoadingUsers } =
    useCustomQuery<User[]>(["users"], () => getUsers(), {
      enabled: true,
    });
  const deleteMutation = useCustomMutation<void, number>(
    (userId: number) => deleteUser(userId),
    [["users"]],
    {
      onSuccess: () => {
        toastSuccess("User deleted with success");
      },
      onError: () => {
        toastError("User deletion failed");
      },
    }
  );

  const editUser = (user: User) => {
    setUserToEdit(user);
    setIsCreating(false);
  };

  const deleteUserHandler = async (user: User) => {
    const confirmContent = (
      <div className="italic">
        Are you sure you want to delete this user:
        <span className="text-xl not-italic font-bold text-primary"> {user.firstname} {user.lastname} ?</span>
      </div>
    );
    if (await confirm({ content: confirmContent })) {
      deleteMutation.mutate(user.id);
    }
  };

  return (
    <div
      className={`flex flex-col h-full custom-scrollbar overflow-y-auto rounded-br-xl rounded-bl-xl ${className}`}
      data-gaelo-flow="users"
    >
      {isLoadingUsers ? (
        <Spinner />
      ) : (
        <UsersTable data={users || []}
          onEdit={editUser}
          onDelete={deleteUserHandler}
        />
      )}
      <div>
        {isCreating ? (
          <CreateUserForm
            title={"Create User"}
            className="bg-gray-200"
            onClose={() => setIsCreating(false)}
          />
        ) : null}
        {userToEdit ? (
          <EditUserForm
            title={"Edit User"}
            className="bg-gray-200"
            onClose={() => {
              setUserToEdit(null);
              setIsCreating(false);
            }}
            userData={userToEdit}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Users;
