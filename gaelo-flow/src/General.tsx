import Button from './RenderComponents/Button';

const Home = () => {
  return (
    <div className="bg-background flex flex-col p-8 h-screen">
      <h1 className="text-3xl font-bold mx-8"> </h1>

      <div className="flex flex-1 gap-6">

        <div className="flex-1 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center">
          <h3 className="text-xl">Orthanc Setting </h3>
          <div className="flex justify-center ...">
            <Button
              className="w-2/8 flex"
              variant="contained"
              color="orange"
            >
              Vider la liste
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4 bg-[#ffffff] rounded-[10px] shadow-xl text-center">
          <h3 className="text-xl">Redis  Setting</h3>
          <div className="flex justify-center ...">
            <Button
              className="w-2/8 flex"
              variant="contained"
              color="orange"
            >
              Vider la liste
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;