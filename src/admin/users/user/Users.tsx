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
import { useConfirm } from "../../../services/ConfirmContextProvider";
type UsersProps = {
  className?: string;
};

const Users = ({ className }: UsersProps) => {
  const { toastSuccess, toastError } = useCustomToast();
  const { confirm } = useConfirm();
  const [isCreating, setIsCreating] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

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

      /**
     * Ask confirmation to delete study and
     * if so delete study
     */
    //   const toggleDeleteStudyConfirmation = async (studyName: string) => {
    //     let reasonForStudyDeletion = null
    //     let confirmContent = (
    //         <div>
    //             <p>You are going to delete this study.</p>
    //             <Form.Text
    //                 label='Reason'
    //                 required
    //                 name='reasonForStudyDeletion'
    //                 isTextArea
    //                 maxLength={255}
    //                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
    //                     reasonForStudyDeletion = event.target.value
    //                 }}
    //             />
    //         </div>
    //     )
    //     if (await confirm({ content: confirmContent })) {
    //         if (!reasonForStudyDeletion)
    //             toastError('A reason must be specified')
    //         else mutateDeleteStudy({ studyName, reasonForStudyDeletion })
    //     }
    // }

    
  const deleteUserHandler = async (user: User) => {
    const confirmContent = (
      <div className="italic">
      Are you sure you want to delete this user: 
      <span className="text-xl not-italic font-bold text-primary"> {user.Firstname} {user.Lastname} ?</span> 
    </div>
    );
    if (await confirm({content: confirmContent})) {
      handleDeleteUser.mutate(user.Id);
    }
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
