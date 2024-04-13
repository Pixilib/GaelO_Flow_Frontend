import Button from "../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../ui/Card";
import { Colors } from "../utils/enums";

const Dashboard = () => {
  const username = "M.Ohma";

  return (
    <div className="p-8 bg-background size-full">
      <h1 className="mx-8 text-3xl font-bold">Overview</h1>
      <div className="m-8 flex h-10 items-center rounded-[10px] bg-white p-10 shadow-xl">
        <h2 className="text-xl">
          <span className="font-bold">{username}</span>
        </h2>
        <img
          src="hello.svg"
          style={{ width: "40px", height: "40px", marginLeft: "4px" }}
          alt="Hello Image"
        ></img>
      </div>

      <div className="flex gap-6 mx-8 columns-3">
        {/* Card Anonymisation */}
        <Card className="flex-1 ">
        <CardHeader title="Anonymisation" color={Colors.primary} />
        <CardBody color={Colors.light}>
            <h3 className="text-xl">Progress</h3>
          </CardBody>
          <CardFooter  color={Colors.light}>
            <Button className="self-center" variant="contained" color="primary">
              Empty List
            </Button>
          </CardFooter>
        </Card>

        {/* Card Delete */}
        <Card className="flex-1 ">
        <CardHeader title="Delete" color={Colors.primary} />
        <CardBody color={Colors.light}>
            <h3 className="text-xl">Progress</h3>
          </CardBody>
          <CardFooter  color={Colors.light}>
            <Button className="self-center" variant="contained" color="primary">
              Empty List
            </Button>
          </CardFooter>
        </Card>

        {/* Card Retrieve */}
        <Card className="flex-1 ">
          <CardHeader title="Delete" color={Colors.primary} />
          <CardBody color={Colors.light}>
                        <h3 className="text-xl">Retrieve</h3>
          </CardBody>
          <CardFooter  color={Colors.light}>
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
