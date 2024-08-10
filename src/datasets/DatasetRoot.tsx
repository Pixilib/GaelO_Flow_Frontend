import Card from "../ui/Card";
import { CardHeader, CardFooter, CardBody } from "../ui/Card";
import { Colors } from "../utils";
import SelectLabels from "./SelectLabels";


const DatasetRoot = () => {
  const handleSelectChange = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    console.log("Selected options:", selectedOptions);
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
      <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light"></CardFooter>
    </Card>
  );
};

export default DatasetRoot;
