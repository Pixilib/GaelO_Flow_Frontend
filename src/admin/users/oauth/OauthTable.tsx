import { Colors, Oauth2Config } from '../../../utils';

import { DeleteButton, Table } from "../../../ui";

type Oauth2TableProps = {
    data: any[];
    onDelete: (provider: Oauth2Config) => void;
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
                const provider = row.original;

                return (
                    <div className="flex justify-center gap-7">
                        <DeleteButton
                            onClick={() => onDelete(provider)}
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

