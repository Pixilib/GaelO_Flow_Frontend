import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard";
import { getOptions } from "../../services/options";
import { useCustomQuery } from "../../utils/reactQuery";

const General = () => {
  const { data, error, isPending } = useCustomQuery(
    ["options"],
    () => getOptions()
  );

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <div className="flex flex-col h-screen p-1 py-8 space-y">
      <RedisCard redisData={{ address: data.RedisAddress, port: data.RedisPort }} />
      <div className="py-8">
        <OrthancCard orthancData={{ address: data.OrthancAddress, port: data.OrthancPort, password: data.OrthancPassword, username: data.OrthancUsername }} />
      </div>
    </div>
  );
};
export default General;
