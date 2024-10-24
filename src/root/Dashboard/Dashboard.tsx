import CardAnon from "./CardAnon";
import CardExport from "./CardExport";
import Cardretrieve from "./Cardretrieve";
const Dashboard = () => {
  const username = "M.Ohma";

  return (
    <div className="p-8 bg-background size-full">
      <h1 className="mx-8 text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-300 to-indigo-800 bg-clip-text">Overview</h1>
      <div className="m-8 flex h-10 items-center rounded-[10px] bg-white p-10 shadow-xl">
        <h2 className="text-xl">
          <span className="font-bold">{username}</span>
        </h2>
        <img
          src="hello.svg"
          style={{ width: "40px", height: "40px", marginLeft: "4px" }}
          alt="Hello Image"
        />
      </div>

      <div className="flex gap-6 mx-8 columns-3">
        {/* Card Anonymisation */}
        <CardAnon />

        {/* Card Export */}
        <CardExport />

        {/* Card Retrieve */}

        <Cardretrieve />
      </div>
    </div>
  );
};

export default Dashboard;
