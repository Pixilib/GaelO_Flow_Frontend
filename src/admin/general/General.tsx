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
    <div className="pt-8"> {/* Ajout d'un padding-top pour l'espace au-dessus */}
  <div className="flex-col h-screen p-1 space-y-12 bg-background">
    <RedisCard redisData={{ address: data.redis_address, port: data.redis_port }} />
    <OrthancCard orthancData={{ address: data.orthanc_address, port: data.orthanc_port, password: data.orthanc_password, username: data.orthanc_username }} />
  </div>
</div>

  );
};

export default General;
