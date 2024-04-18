import { BsPersonPlusFill as CreateUser } from "react-icons/bs"; 
import { getUsers } from "../../services/users";
import { Button, Spinner } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomQuery } from "../../utils/reactQuery";
import { UserResponse } from "../../utils/types";
import UsersTable from "./UsersTable";



const LocalUsers = () => {
    const UsersDisplay = () => {
        return isLoadingUsers ? <Spinner /> : <UsersTable data={users||[]} />;
    };
    const { data: users, isPending: isLoadingUsers } = useCustomQuery<UserResponse>(
        ["users"],
        ()=> getUsers(),
        {
            enabled: true,
            refetchInterval: 10000,
        }
    );

    return (
        <div>
            <UsersDisplay />;
            <div className="flex justify-center mb-10 mt-9">
            <Button color={Colors.success} className="flex justify-center gap-4 w-52 h-11 hover:successHover">
                <CreateUser size={'1.3rem'} />
                <div className="">Create User</div>
            </Button>
            </div>
        </div>
)

}
export default LocalUsers;