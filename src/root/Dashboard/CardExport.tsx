import { Export } from "../../icons";
import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const CardExport = () => {
    return (
        <Card className="flex-1 overflow-hidden rounded-lg shadow-lg md:max-w-md">
              <CardHeader centerTitle color={Colors.secondary} className="flex items-center">
                <Export className="mr-3 text-xl text-white " /> 
                <span className="text-lg font-bold text-white">Anonymisation</span>
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

export default CardExport;
