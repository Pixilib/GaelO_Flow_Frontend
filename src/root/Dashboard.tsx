import Button from "../RenderComponents/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../RenderComponents/Card";
import { Colors } from "../utils/enums";

const Dashboard = () => {
  const username = "M.Ohma";

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-background size-full p-8">
      <h1 className="mx-8 text-3xl font-bold">Overview</h1>

      <div className="m-8 flex h-10 items-center rounded-[10px] bg-white p-10 shadow-xl">
        <h2 className="text-xl">
          Welcome <span className="font-bold">{username}</span>
        </h2>
        <img
          src="hello.svg"
          style={{ width: "40px", height: "40px", marginLeft: "4px" }}
          alt="Hello Image"
        ></img>
      </div>

      <div className="mx-8 flex columns-3 gap-6">
        {/* Card Anonymisation */}
        <Card className="flex-1 ">
          <CardHeader title="Anonymisation" />
          <CardBody>
            <h3 className="text-xl">Progress</h3>
          </CardBody>
          <CardFooter>
            <Button className="self-center" variant="contained" color="primary">
              Empty List
            </Button>
          </CardFooter>
        </Card>

        {/* Card Delete */}
        <Card className="flex-1 ">
          <CardHeader title="Delete" color={Colors.dark} />
          <CardBody>
            <h3 className="text-xl">Progress</h3>
          </CardBody>
          <CardFooter>
            <Button className="self-center" variant="contained" color="primary">
              Empty List
            </Button>
          </CardFooter>
        </Card>

        {/* Card Retrieve */}
        <Card className="flex-1 ">
          <CardHeader title="Delete" color={Colors.dark} />
          <CardBody>
            <h3 className="text-xl">Retrieve</h3>
          </CardBody>
          <CardFooter>
            <Button className="self-center" variant="contained" color="primary">
              Empty List
            </Button>
          </CardFooter>
        </Card>     
        
         </div>
    </div>
  );
};

export default Dashboard;
