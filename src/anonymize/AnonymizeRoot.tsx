import { Card, CardHeader, CardBody, CardFooter } from "../ui";
import { Colors } from "../utils";

const AnonymizeRoot = () => {
    return (
        <Card>
            <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={"Anonymize Resources"}
            />
            <CardBody color={Colors.almond}>
                <div className="flex flex-col">
                    Hello World Anon
                </div>
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center gap-3">
            </CardFooter>
        </Card>
    );
};

export default AnonymizeRoot;