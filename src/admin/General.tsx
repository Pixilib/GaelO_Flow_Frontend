import { Colors } from '../utils/enums';
import Button from '../RenderComponents/Button';


const General = () => {
  return (
    <div className="flex flex-col h-screen p-8 bg-background">
      <h1 className="mx-8 text-3xl font-bold"> </h1>

      <div className="flex flex-1 gap-20">

        <div className="w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col">
          <h3 className="mx-8 text-xl font-bold">Orthanc Setting </h3>
          <div className="flex items-end justify-center flex-1">
            <Button
              className="flex w-2/8"
              variant="contained"
              color={Colors.primary}
            >
              Vider la list
            </Button>
          </div>
        </div>

        <div className="w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col">
          <h3 className="mx-12 text-xl font-bold">Redis  Setting</h3>
          <div className="flex items-end justify-center flex-1">
            <Button
              className="flex w-2/8"
              variant="contained"
              color={Colors.primary}
            >
              Vider la liste
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
