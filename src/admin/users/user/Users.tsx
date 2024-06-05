import { useState } from "react";
import { BsPersonPlusFill as CreateUser } from "react-icons/bs";

import { deleteUser, getUsers } from "../../../services/users";
import { useCustomMutation, useCustomQuery } from "../../../utils/reactQuery";
import { useCustomToast } from "../../../utils/toastify";
import { User, UserResponse } from "../../../utils/types";
import { Colors } from "../../../utils/enums";

import { Button, Spinner } from "../../../ui";
import UsersTable from "./UsersTable";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";

type UsersProps = {
  className?: string;
};

const Users = ({ className }: UsersProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const { toastSuccess, toastError } = useCustomToast();

  const { data: users, isPending: isLoadingUsers } =
    useCustomQuery<UserResponse>(["users"], () => getUsers(), {
      enabled: true,
    });
  const handleDeleteUser = useCustomMutation<void, number>(
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

  const deleteUserHandler = (user: User) => {
    handleDeleteUser.mutate(user.Id);
  };
  return (
    <div
      className={`flex flex-col h-full custom-scrollbar overflow-y-auto ${className}`}
      data-gaelo-flow="users"
    >
      {isLoadingUsers ? (
        <Spinner />
      ) : (
        <UsersTable data={users || []} onEdit={editUser} onDelete={deleteUserHandler} />
      )}
      {userToEdit === null && !isCreating && (
        <div className="flex justify-center mx-10 mt-12">
          <Button
            color={Colors.success}
            onClick={() => {
              setIsCreating(true);
              setUserToEdit(null);
            }}
            className="flex justify-center gap-4 mb-10 w-52 h-11 hover:successHover"
          >
            <CreateUser size={"1.3rem"} />
            Create User
          </Button>
        </div>
      )}
      <div>
        {isCreating ? (
          <CreateUserForm
            title={"Create User"}
            className="bg-[#EFEFEF]"
            onClose={() => setIsCreating(false)}
          />
        ) : null}
        {userToEdit ? (
          <EditUserForm
            title={"Edit User"}
            className="bg-[#EFEFEF]"
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
