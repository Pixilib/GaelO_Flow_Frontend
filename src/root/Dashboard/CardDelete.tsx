import { Export } from "../../icons";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const CardDelete = () => {
    return (
        <Card className="flex-1 bg-white overflow-hidden rounded-lg shadow-lg md:max-w-md dark:bg-neutral-500">
              <CardHeader centerTitle color={Colors.danger} className="flex items-center">
                <Export className="mr-3 text-xl text-white " /> 
                <span className="text-lg font-bold text-white">Delete</span>
            </CardHeader>
            
            <CardBody
                className="flex flex-col items-center justify-center p-6 dark:bg-neutral-500 bg-gray-50"
                color={Colors.light} children={""}                
            >
                
            </CardBody>
            <CardFooter className="flex justify-center dark:bg-neutral-500" color={Colors.white}>
            </CardFooter>
        </Card>
    );
};

export default CardDelete;
