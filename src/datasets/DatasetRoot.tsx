import Card from "../ui/Card";
import { CardHeader, CardFooter, CardBody } from "../ui/Card";
import { Colors } from "../utils";
import SelectLabels from "./SelectLabels";
import { Button } from "../ui";
const DatasetRoot = () => {
  const handleSelectChange = (selectedLabels: string[]) => {
    console.log("Selected options:", selectedLabels);
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  return (
    <Card>
      <CardHeader
        className="flex items-center justify-center rounded-t-lg text-bg-light"
        color={Colors.primary}
        title="Dataset"
      />
      <CardBody>
        <SelectLabels onChange={handleSelectChange} closeMenuOnSelect={false} />
      </CardBody>
      <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
        <Button 
          color={Colors.secondary} onClick={handleButtonClick}>To Export</Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetRoot;
