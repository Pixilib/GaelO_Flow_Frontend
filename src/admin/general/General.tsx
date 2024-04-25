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
    <div className="flex flex-col">
      <RedisCard redisData={{ address: data.RedisAddress, port: Number(data.RedisPort), password: data.RedisPort }} />
      <div className="py-8">
        <OrthancCard orthancData={{ address: data.OrthancAddress, port: Number(data.OrthancPort), password: data.OrthancPassword, username: data.OrthancUsername }} />
      </div>
    </div>
  );
};
export default General;
