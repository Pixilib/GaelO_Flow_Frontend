import { useSelector } from "react-redux"
import { BsTrashFill as DeleteIcon } from "react-icons/bs"
import { FaFileExport as ExportIcon } from "react-icons/fa"
import AnonIcon from "../ui/AnonIcon"
import { RootState } from "../store"

const DeleteList = () => {
    const deleteList = useSelector((state: RootState) => state.delete.studies)
    const anonList = useSelector((state: RootState) => state.anonymize.studies)
    const exportList = useSelector((state: RootState) => state.export.series)

    return (
        <div className="flex items-center gap-4 p-1 mx-4 bg-primary rounded-2xl">
            <span className="flex items-center p-0.5 bg-white rounded-md shadow-md hover:bg-blue-500 transition-colors group">
                <AnonIcon
                    className="mr-2 text-xl text-blue-900 cursor-pointer group-hover:text-white"
                    onClick={() => alert('Anonymize action triggered!')}
                />
                <span className="px-1 py-0.5 rounded-full border border-gray-300 shadow-[0_4px_6px rgba(47,123,186,0.5)]">
                    {Object.keys(anonList).length}
                </span>
            </span>
            <span className="flex items-center p-0.5 bg-white rounded-md shadow-md hover:bg-orange-500 transition-colors group">
                <ExportIcon
                    className="mr-2 text-xl cursor-pointer text-secondary group-hover:text-white"
                    onClick={() => alert('Export action triggered!')}
                />
                <span className="px-1 py-0.5 rounded-full border border-gray-300 shadow-[0_4px_6px rgba(255,165,0,0.5)]">
                    {Object.keys(exportList).length}
                </span>
            </span>
            <span className="flex items-center p-0.5 bg-white rounded-md shadow-md hover:bg-red-500 transition-colors group">
                <DeleteIcon
                    className="mr-2 text-xl text-red-500 cursor-pointer group-hover:text-white"
                    onClick={() => alert('Delete action triggered!')}
                />
                <span className="px-1 py-0.5 rounded-full border border-gray-300 shadow-[0_4px_6px rgba(255,0,0,0.3)]">
                    {Object.keys(deleteList).length}
                </span>
            </span>
        </div>
    )
}

export default DeleteList
