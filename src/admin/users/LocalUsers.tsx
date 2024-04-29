import { useNavigate } from "react-router-dom";
import { BsPersonPlusFill as CreateUser } from "react-icons/bs";
import { deleteUser, getUsers } from "../../services/users";
import { Button, Spinner } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { UserResponse } from "../../utils/types";
import UsersTable from "./UsersTable";
import { useCustomToast } from "../../utils/toastify";


//! WIP
const LocalUsers = () => {
    const navigate = useNavigate();
    const { toastSuccess, toastError } = useCustomToast();
    const { data: users, isPending: isLoadingUsers } = useCustomQuery<UserResponse>(
        ["users"],
        () => getUsers(),
        {
            enabled: true,
        }
    );
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


    const handleCreateUser = () => {
        navigate("create");
    }

    const handleEditUser = (userId: number) => {
        const user = users?.find((user) => user.Id === userId);
        navigate(`edit`, { state: { user } });
    }

    const confirmDelete = (userId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this user?");
        if (confirmation) {
            handleDeleteUser.mutate(userId);
        }
    };
    return (
        <div>
            {isLoadingUsers ? (
                <Spinner />
            ) : (
                <>
                    <UsersTable
                        data={users || []}
                        onEdit={handleEditUser}
                        onDelete={confirmDelete} 
                    />
                    <div className="flex justify-center mx-10 mb-10 mt-9">
                        <Button
                            color={Colors.success}
                            onClick={handleCreateUser}
                            className="flex justify-center gap-4 w-52 h-11 hover:successHover"
                        >
                            <CreateUser size={'1.3rem'} />
                            Create User
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
export default LocalUsers;