import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";

const Cardretrieve = () => {
    return (
        <Card className="flex-1">
            <CardHeader centerTitle title="Retrieve" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <h3 className="text-xl">Progress</h3>
            </CardBody>
            <CardFooter color={Colors.light}>
                <Button className="self-center" color={Colors.primary}>
                    Empty List
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Cardretrieve;
