import { Colors } from '../utils/enums';
import Button from '../RenderComponents/Button';

const General = () => {
  return (
    <div className="bg-background flex flex-col p-8 h-screen">
      <h1 className="text-3xl font-bold mx-8"> </h1>

      <div className="flex flex-1 gap-20">

        <div className="w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col">
          <h3 className="text-xl font-bold mx-8">Orthanc Setting </h3>
          <div className="flex flex-1 justify-center items-end">
            <Button
              className="w-2/8 flex"
              variant="contained"
              color={Colors.primary}
            >
              Vider la liste
            </Button>
          </div>
        </div>

        <div className="w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col">
          <h3 className="text-xl font-bold mx-12">Redis  Setting</h3>
          <div className="flex flex-1 justify-center items-end">
            <Button
              className="w-2/8 flex"
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
