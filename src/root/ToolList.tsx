import { useSelector } from "react-redux"
import { RootState } from "../store"

import AnonIcon from "../ui/AnonIcon"
import ToolItem from "./ToolItem"
import { useNavigate } from "react-router-dom"
import { Export, Trash } from "../icons"

const ToolList = () => {

    const navigate = useNavigate();

    const deleteList = useSelector((state: RootState) => state.delete.studies)
    const anonList = useSelector((state: RootState) => state.anonymize.studies)
    const exportList = useSelector((state: RootState) => state.export.series)

    return (

        <div className="flex justify-between gap-3 p-3 grow flex-nowrap bg-primary rounded-2xl w-60">
            <ToolItem count={Object.keys(anonList).length} onClick={() => navigate('/anonymize')}>
                <AnonIcon
                    className="text-blue-900 cursor-pointer group-hover:text-white"
                />
            </ToolItem>
            <ToolItem count={Object.keys(exportList).length} onClick={() => navigate('/export')}>
                <Export
                    className="cursor-pointer text-secondary group-hover:text-white"
                />
            </ToolItem>
            <ToolItem count={Object.keys(deleteList).length} onClick={() => navigate('/delete')}>
                <Trash
                    className="text-red-500 cursor-pointer group-hover:text-white"
                />
            </ToolItem>
        </div>
    );

}

export default ToolList
