import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard"
import { getOptions } from "../../services/options";
import { useCustomQuery } from "../../utils/reactQuery";


const General = () => {

  const { data, error, isPending } = useCustomQuery(
    ['options'],
    () => getOptions()
  )

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-background h-screen flex-col space-y-12 p-1">
      <RedisCard redisData={{ address: data.redis_address, port: data.redis_port }} />
      <OrthancCard orthancData={{ address: data.orthanc_address, port: data.orthanc_port, password: data.orthanc_password, username: data.orthanc_username }} />
    </div>
  );
};

export default General;
