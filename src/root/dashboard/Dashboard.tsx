import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../reducers/UserSlice";
import { Spinner } from "../../ui";
import CardRetrieve from "./CardRetrieve";
import CardAnon from "./CardAnon";
import CardDelete from "./CardDelete";
import { useCustomQuery, User } from "../../utils";
import { getUserById } from "../../services";

const Dashboard = () => {
  const userState = useSelector((state: RootState) => state.user) as UserState;

  const { data: userData, isPending } = useCustomQuery<User>(
    ["users", userState?.currentUserId.toString()],
    () => getUserById(userState?.currentUserId)
  );

  if (isPending) return <Spinner />;

  const username = `${userData?.firstname} ${userData?.lastname}`;

  return (
    <div className="p-4 md:p-8 bg-background size-full">
      <h1 className="text-2xl font-medium md:text-4xl animate-typing text-slate-400 dark:text-white">
        Hello,
      </h1>

      <h2 className="flex items-center mb-6 overflow-hidden text-3xl font-medium text-transparent md:mb-10 md:text-5xl bg-gradient-to-r from-indigo-800 via-orange-400 to-violet-800 dark:from-indigo-500 dark:via-orange-500 dark:to-violet-800 bg-clip-text whitespace-nowrap animate-typing">
        {username}
        <span className="ml-4 text-4xl text-primary">👋🏻</span>
      </h2>

      <div className="flex justify-around md:flex-row md:gap-6 w-full">
        <CardRetrieve />
        <CardAnon />
        <CardDelete />
      </div>
    </div>
  );
};

export default Dashboard;
