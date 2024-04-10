import { Card, CardBody, CardHeader } from '../../ui';
import { Colors } from '../../utils/enums';


type RetrieveCardProps = {
    data: any[];
};

const RetrieveCard = ({ data = [] }: RetrieveCardProps) => {
    return (

    <Card className="flex justify-center w-full h-full bg-white">
            <CardHeader title="Retrieve Schedule Time: " color={Colors.success}/>
            <CardBody color={Colors.light}>
                <div>ok</div>
            </CardBody>         
    </Card>
)

}
export default RetrieveCard;