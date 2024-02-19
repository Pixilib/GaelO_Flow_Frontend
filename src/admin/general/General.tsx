import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard"


const General = () => {

  return (
    <div className="flex-col h-screen p-1 space-y-12 bg-background">
            <RedisCard />
      <OrthancCard />
    </div>
  );
};

export default General;
