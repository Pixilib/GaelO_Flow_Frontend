import { useSelector } from "react-redux"
import { RootState } from "../store"

import ToolItem from "./ToolItem"
import { useNavigate } from "react-router"
import { Anon, Export, Trash } from "../icons"
import { UserState } from "../reducers/UserSlice"
import { useCustomQuery, User } from "../utils"
import { getUserById } from "../services"
import { Spinner } from "../ui"
import { useEffect, useState } from "react"

const ToolList = () => {
  const navigate = useNavigate();

  const userState = useSelector((state: RootState) => state.user) as UserState;
  const { data: userData, isPending } = useCustomQuery<User>(
    ["users", userState?.currentUserId.toString()],
    () => getUserById(userState?.currentUserId)
  );

  const deleteList = useSelector((state: RootState) => state.delete.studies)
  const anonList = useSelector((state: RootState) => state.anonymize.studies)
  const exportList = useSelector((state: RootState) => state.export.series)

  const editPermissionNumber =
    (userData?.role?.anonymize ? 1 : 0) +
    (userData?.role?.export ? 1 : 0) +
    (userData?.role?.delete ? 1 : 0);

  if (editPermissionNumber === 0) return null;

  let widthClass = "";
  if (editPermissionNumber === 3) widthClass = "w-64";
  else if (editPermissionNumber === 2) widthClass = "w-43";
  else if (editPermissionNumber === 1) widthClass = "w-21";

  if (isPending) return <Spinner />

  return (
    <div className={`flex justify-between gap-3 p-2 grow flex-nowrap bg-primary rounded-2xl dark:bg-indigo-700 ${widthClass}`}>
      {userData?.role?.anonymize && (
        <ToolItem count={Object.keys(anonList).length} onClick={() => navigate('/anonymize')}>
          <Anon
            className="text-blue-900 cursor-pointer dark:text-blue-400 dark:to-blue-500 group-hover:text-white size-6"
          />
        </ToolItem>
      )}
      {userData?.role?.export && (
        <ToolItem count={Object.keys(exportList).length} onClick={() => navigate('/export')}>
          <Export
            className="cursor-pointer text-secondary group-hover:text-white"
          />
        </ToolItem>
      )}
      {userData?.role?.delete && (
        <ToolItem count={Object.keys(deleteList).length} onClick={() => navigate('/delete')}>
          <Trash
            className="text-red-500 cursor-pointer group-hover:text-white"
          />
        </ToolItem>
      )}
    </div>
  );

}

export default ToolList
