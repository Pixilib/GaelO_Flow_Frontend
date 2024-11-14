import { useSelector } from "react-redux"
import { RootState } from "../store"

import ToolItem from "./ToolItem"
import { useNavigate } from "react-router-dom"
import { Anon, Export, Trash } from "../icons"

const ToolList = () => {

    const navigate = useNavigate();

    const deleteList = useSelector((state: RootState) => state.delete.studies)
    const anonList = useSelector((state: RootState) => state.anonymize.studies)
    const exportList = useSelector((state: RootState) => state.export.series)

    return (

        <div className="flex justify-between w-64 gap-3 p-2 grow flex-nowrap bg-primary rounded-2xl">
            <ToolItem count={Object.keys(anonList).length} onClick={() => navigate('/anonymize')}>
                <Anon
                    className="text-blue-900 cursor-pointer group-hover:text-white size-6"
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
