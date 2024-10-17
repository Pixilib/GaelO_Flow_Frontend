import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import AnonQueues from "../../anonymize/AnonQueues";
import { Colors } from "../../utils/enums";

const CardAnon = () => {
    return (
        <Card className="flex-1">
            <CardHeader centerTitle title="Anonymisation" color={Colors.blueCustom} />
            <CardBody color={Colors.light}>
                <AnonQueues circle={true} showResults={false}
                />
            </CardBody>
            <CardFooter color={Colors.light}>
                <Button className="self-center" color={Colors.blueCustom}>
                    Empty List
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CardAnon;
