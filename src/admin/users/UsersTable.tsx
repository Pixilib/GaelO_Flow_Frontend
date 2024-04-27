import { BsPencilFill as Edit } from "react-icons/bs";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import { UserResponse } from "../../utils/types";


type UsersProps = {
    data: UserResponse;
}

const UsersTable = ({ data = [] }: UsersProps) => {
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
            cell({ row }: { row: any }) {
                return (
                    <div className="flex justify-center">
                        <input id="SuperAdmin" type="checkbox" checked={row.original.SuperAdmin} disabled />
                        <label htmlFor="SuperAdmin" className="ml-2">SuperAdmin</label>
                    </div>
                )
            }
        },
        {
            header: 'Action',
            cell: (info: any) => {
                return (
                    <div className="flex justify-center">
                        <Edit size={'1.3rem'} color="#DFB520" onClick={() => console.log('click on Edit')} />
                    </div>
                )
            }
        },
    ]

    return (
        <div className="mx-5 mt-4 ">
            <Table data={data} columns={columns} headerColor={Colors.almond} enableColumnFilters enableSorting/>
        </div>
    )
}
export default UsersTable;