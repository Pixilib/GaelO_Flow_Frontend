import { useState } from "react";

import { deleteUser, getUsers } from "../../../services/users";
import { Colors } from "../../../utils";
import { useConfirm } from "../../../services/ConfirmContextProvider";
import { useCustomMutation, useCustomQuery } from "../../../utils/reactQuery";
import { useCustomToast } from "../../../utils/toastify";
import { User } from "../../../utils/types";
import { Button, CardFooter, Spinner } from "../../../ui";
import UsersTable from "./UsersTable";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import { More } from "../../../icons";

type UsersProps = {
  className?: string;
};

const Users = ({ className = "" }: UsersProps) => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { data: users, isPending: isLoadingUsers } =
    useCustomQuery<User[]>(["users"], () => getUsers());

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
      className={`flex flex-col h-full custom-scrollbar overflow-y-auto rounded-br-xl ${className}`}
      data-gaelo-flow="users"
    >
      {isLoadingUsers ? (
        <Spinner />
      ) : (
        <UsersTable data={users || []} onEdit={editUser} onDelete={deleteUserHandler} />
      )}

      {userToEdit ? (
        <EditUserForm
          title={"Edit User"}
          className="bg-gray-200 "
          onClose={() => {
            setUserToEdit(null);
          }}
          userData={userToEdit}
        />
      ) : null}

      <CardFooter className="p-0 border-t-2 rounded-b-lg shadow-inner bg-light border-slate-200 dark:border-neutral-700 dark:bg-slate-950">
        <div className="flex justify-center">
          {!isCreatingUser ? (
            <Button
              color={Colors.success}
              onClick={() => setIsCreatingUser(true)}
              className="flex justify-center gap-4 mt-4 mb-4 w-52 hover:successHover"
            >
              <More size={18} />
              Create User
            </Button>
          ) : (
            <CreateUserForm onClose={() => setIsCreatingUser(null)} />
          )}
        </div>
      </CardFooter>
    </div>
  );
};

export default Users;
