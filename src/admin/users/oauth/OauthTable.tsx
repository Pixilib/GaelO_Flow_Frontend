import { BsTrashFill as Delete } from "react-icons/bs";

import { Colors, useModal } from '../../../utils';

import { ConfirmModal, Table } from "../../../ui";

type Oauth2TableProps = {
    data: any[];
    onDelete: (provider: string) => void;
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
                const { dialogRef, openDialog, closeDialog } = useModal();

                return (
                    <div className="flex justify-center gap-7">
                        <Delete size={'1.4rem'}
                            className="transition duration-70 hover:scale-110"
                            color="#DF3B20"
                            onClick={openDialog}
                        />
                        <ConfirmModal
                            dialogRef={dialogRef}
                            closeDialog={closeDialog}
                            message={
                                <div className="italic">
                                  Are you sure you want to delete this provider: 
                                  <span className="text-xl not-italic font-bold text-primary">  {provider.Name} ?</span> 
                                </div>
                              }
                            onConfirm={() => onDelete(provider.Name)}
                            className="shadow-xl bg-zinc-200"
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

