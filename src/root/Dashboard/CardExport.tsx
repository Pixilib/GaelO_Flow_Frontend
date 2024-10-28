import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const CardExport = () => {
    return (
        <Card className="flex-1">
            <CardHeader centerTitle title="Export" color={Colors.secondary} />
            <CardBody color={Colors.light}>
                <h3 className="text-xl">Progress</h3>
            </CardBody>
            <CardFooter color={Colors.light}>
            <Button className="self-center" color={Colors.secondary}>
    Empty List
</Button>       
            </CardFooter>
        </Card>
    );
};

export default CardExport;
