import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useContext } from "react";
import GaelOContext from '../export/gaelo/context/GaelOContext';

const UserProfile = () => {
    const role = useSelector((state: RootState) => state.user.role);

    return (
    <div className="flex flex-col gap-2 w-60">
        <p>Role : {role.name}</p>
        <p>Email : </p>
        <p>First Name : </p>
        <p>Last Name : </p>
    </div>
  );
}

export default UserProfile;