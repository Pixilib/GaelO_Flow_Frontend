import { Table } from "../../../ui";
import { Colors } from '../../../utils/enums';
import { BsTrashFill as Delete } from "react-icons/bs";

type Oauth2TableProps = {
    data: any[];
    onDelete?: (provider: string) => void;
}


const OauthTable = ({ data = [], onDelete }: Oauth2TableProps) => {
    const columns = [
        {
            header: "Name",
            accessorKey: "Name",

        },
        {
            header: "Provider",
            accessorKey: "Provider",
        },
        {
            header: "Authorization URL",
            accessorKey: "AuthorizationUrl",
        },
        {
            header: "Client ID",
            accessorKey: "ClientId",
        },
        {
            header: 'Action',
            cell({ row }: { row: any }) {
                const provider = row.original.Name;
                return (
                    <div className="flex justify-center gap-7">
                        <Delete size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={() => onDelete?.(provider)}
                        />
                    </div>
                )
            }
        }
    ]

    return (
        <div className="mx-5 mt-4">
            <Table
                data={data}
                columns={columns}
                headerColor={Colors.almond}
                enableSorting
            />
        </div>
    )
}

export default OauthTable;

