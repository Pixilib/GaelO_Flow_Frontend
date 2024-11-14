import { Export } from "../../icons";
import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const CardExport = () => {
    return (
        <Card className="flex-1 overflow-hidden rounded-lg shadow-lg md:max-w-md">
              <CardHeader centerTitle color={Colors.secondary} className="flex items-center">
                <Export className="mr-3 text-xl text-white" />  {/* Add margin to the right of the icon */}
                <span className="text-lg font-bold text-white">{/* Title inside span to ensure proper styling */}Anonymisation</span>
            </CardHeader>
            
            <CardBody
                className="flex flex-col items-center justify-center p-6 bg-gray-50"
                color={Colors.light}
                
            >
                
            </CardBody>
            <CardFooter className="flex justify-center" color={Colors.white}>
            </CardFooter>
        </Card>
    );
};

export default CardExport;
