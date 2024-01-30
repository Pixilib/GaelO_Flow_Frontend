import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard"


const General = () => {

  return (
    <div className="flex-col h-screen p-8 space-y-3 bg-background">
      <RedisCard />
      <OrthancCard />
    </div>
  );
};

export default General;
