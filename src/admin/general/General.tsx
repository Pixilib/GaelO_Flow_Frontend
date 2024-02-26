import RedisCard from "./RedisCard";
import OrthancCard from "./OrthancCard"


const General = () => {

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-background h-screen flex-col space-y-12 p-1">
      <RedisCard />
      <OrthancCard />
    </div>
  );
};

export default General;
