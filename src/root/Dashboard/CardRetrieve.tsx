import { AutoRetrieve } from "../../assets";
import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const CardRetrieve = () => {
    return (
        <Card className="flex-1">
            <CardHeader centerTitle color={Colors.primary} className="flex items-center">
            <AutoRetrieve className="mr-3 text-xl text-white" />
            <span className="text-lg font-bold text-white">Retrieve</span>
            </CardHeader>
            <CardBody color={Colors.light} children={""}>
            </CardBody>
        </Card>
    );
};

export default CardRetrieve;
