import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard"
import { getOptions } from "../../services/options";
import { useCustomQuery } from "../../utils/reactQuery";


const General = () => {

  const { data, error, isPending } = useCustomQuery(
    ["options"],
    () => getOptions()
  )

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-background h-screen flex-col space-y-12 p-1">
      <RedisCard redisData={{ address: data.RedisAddress, port: data.RedisPort }} />
      <OrthancCard orthancData={{ address: data.OrthancAddress, port: data.OrthancPort, password: data.OrthancPassword, username: data.OrthancUsername }} />
    </div>
  );
};

export default General;
