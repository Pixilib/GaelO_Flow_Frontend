import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUserById } from "../services";
import { useCustomQuery, User } from "../utils";
import { UserState } from '../reducers/UserSlice';
import { User as UserIcon } from "../icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


const UserProfile = () => {
  const userState = useSelector((state: RootState) => state.user) as UserState;
  const { data: userData, isPending } = useCustomQuery<User>(
    ["users", userState?.currentUserId.toString()],
    () => getUserById(userState?.currentUserId),
  );

  const styleInfo = 'flex flex-row justify-between dark:text-white';
  const {t} = useTranslation()

  if (isPending) return <div className="spinner" />;

  return (
    <div className="flex flex-col gap-2 w-80">
      <div className="flex flex-row items-center gap-2 pl-1 dark:text-white">
        <UserIcon></UserIcon>
        <p className="font-bold">{t("user.Profile Overview")}</p>
      </div>
      <div className="border-b border-b-gray-600" />
      <div>
        <div className={styleInfo}>
          <p className="font-semibold">{t("user.First Name")}</p>
          <p>{userData?.firstname}</p>
        </div>
        <div className={styleInfo}>
          <p className="font-semibold">{t("user.Last Name")}</p>
          <p>{userData?.lastname}</p>
        </div>
        <div className={styleInfo}>
          <p className="font-semibold">{t("user.Email")}</p>
          <p>{userData?.email}</p>
        </div>
        <div className={styleInfo}>
          <p className="font-semibold">{t("user.Role")}</p>
          <p>{userData?.role?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;