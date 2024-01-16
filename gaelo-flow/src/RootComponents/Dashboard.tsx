import Button from "./../RenderComponents/Button";

const Dashboard = () => {
  const username = "M.Ohma";

  return (
    <div className="bg-background p-8 h-full w-full">
      <h1 className="text-3xl font-bold mx-8">Overview</h1>

      <div className="m-8 bg-gradient-to-r from-indigo-700 to-amber-500 text-white p-10 rounded-[10px] shadow-xl flex items-center h-10">
        <h2 className="text-xl">
          Welcome <span className="font-bold">{username}</span>
        </h2>
        <img
          src="hello.svg"
          style={{ width: "40px", height: "40px", marginLeft: "4px" }}
          alt="Hello Image"
        ></img>
      </div>

      <div className="mx-8 columns-3 flex gap-6">
  <div className="relative flex-1 p-4 bg-white rounded-[10px] shadow-xl flex flex-col justify-between">
    <div>
      <p className="text-lg font-semibold">Anonymisation</p>
      <h3 className="text-xl">Progress</h3>
    </div>
    <Button
      className="self-center"
      variant="contained"
      color="secondary"
    >
      Empty List
    </Button>
  </div>

  <div className="relative flex-1 p-4 bg-white rounded-[10px] shadow-xl flex flex-col justify-between">
    <div>
      <p className="text-lg font-semibold text-dark">Delete</p>
      <h3 className="text-xl">Progress</h3>
    </div>
    <Button
      className="self-center"
      variant="contained"
      color="secondary"
    >
      Empty List
    </Button>
  </div>

  <div className="relative flex-1 p-4 bg-white rounded-[10px] shadow-xl flex flex-col justify-between">
    <div>
      <p className="text-lg font-semibold text-dark">Delete</p>
      <h3 className="text-xl">Progress</h3>
    </div>
    <Button
      className="self-center"
      variant="contained"
      color="secondary"
    >
      Empty List
    </Button>
  
</div>

  


</div>

      <div className="m-8 flex bg-[#ffffff] rounded-[10px] p-4 shadow-xl items-center">
        <p className="text-lg font-semibold text-dark">Active Task</p>
      </div>
    </div>
  );
};

export default Dashboard;
