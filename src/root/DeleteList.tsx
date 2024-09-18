import { useSelector } from "react-redux"
import { BsTrashFill as DeleteIcon } from "react-icons/bs"
import { BiExport as ExportIcon } from "react-icons/bi"
import { FaUserSecret as AnonIcon } from "react-icons/fa";

import { RootState } from "../store"

const DeleteList = () => {

    const deleteList = useSelector((state: RootState) => state.delete.studies)
    const anonList = useSelector((state: RootState) => state.anonymize.studies)
    const exportList = useSelector((state: RootState) => state.export.series)

    return (
        <div className="flex items-center gap-3 p-3 border rounded-xl">
            <span className="flex items-center">
                <AnonIcon
                    className="mr-2 text-2xl text-blue-900 cursor-pointer hover:text-red-700"
                    onClick={() => alert('Delete action triggered!')}
                />
                <span className="px-2 py-0.5 bg-white rounded-md border border-gray-300 shadow-[0_4px_6px_rgba(255,0,0,0.3)]">
                    {Object.keys(anonList).length}
                </span>
            </span>
            <span className="flex items-center">
                <ExportIcon
                    className="mr-2 text-2xl cursor-pointer text-secondary hover:text-orange-700"
                    onClick={() => alert('Delete action triggered!')}
                />
                <span className="px-2 py-0.5 bg-white rounded-md border border-gray-300 shadow-[0_4px_6px_rgba(255,165,0,0.5)]">
                    {Object.keys(exportList).length}
                </span>
            </span>
            <span className="flex items-center">
                <DeleteIcon
                    className="mr-2 text-2xl text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => alert('Delete action triggered!')}
                />
                <span className="px-2 py-0.5 bg-white rounded-md border border-gray-300 shadow-[0_4px_6px_rgba(255,0,0,0.3)]">
                    {Object.keys(deleteList).length}
                </span>
            </span>

        </div>
    )
}

export default DeleteList
