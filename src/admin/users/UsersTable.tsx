import { BsPencilFill as Edit } from "react-icons/bs"; 
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import { UserResponse } from "../../utils/types";


type UsersProps = {
    data: UserResponse;
}

const UsersTable = ({ data = [] }: UsersProps) => {
    console.log({ data })
    const columns = [
        {
            header: 'Username',
            accessorKey: 'Username',
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
            header: 'Super Admin',
            accessorKey: 'SuperAdmin',
            enableColumnFilters: true,
        },
        {
            header: 'Action',
            cell:( info:any ) => {
                return(
                    <div className="flex justify-center">
                        <Edit size={'1.3rem'} color="gray" />
                    </div>
                )
            }
        },
        
    ]

    return (
        <div className="mx-12 mt-4">
            <Table data={data} columns={columns} headerColor={Colors.almond} />
        </div>
    );
}
export default UsersTable;