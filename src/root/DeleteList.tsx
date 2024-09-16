import { useSelector } from "react-redux"
import { Button } from "../ui"
import { Colors } from "../utils"
import { RootState } from "../store"

const DeleteList = () => {

    const deleteList = useSelector((state: RootState) => state.delete.studies)

    return (
        <Button color={Colors.danger}>Delete List {Object.keys(deleteList).length}</Button>
    )
}

export default DeleteList