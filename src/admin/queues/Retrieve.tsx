import { Card, CardHeader, CardBody } from '../../ui';
import { Colors } from '../../utils/enums';
import SelectionInput from '../../ui/SelectInput';
import Input from '../../ui/Input';


//!WIP - This component is not yet finished
type RetrieveProps = {
    data: any[]|null;
}
const Retrieve = ({ data }: RetrieveProps) => {

    const timerClock = (data: any) => {
        // return a date Object with conactenate "AutoQueryHourStart" and "AutoQueryMinuteStart" to data
        const autoQueryHourStart = data.AutoQueryHourStart;
        const autoQueryMinuteStart = data.AutoQueryMinuteStart;
        const date = new Date();
        date.setHours(autoQueryHourStart);
        date.setMinutes(autoQueryMinuteStart);
        console.log({ date });
        return date;
    }
    
    return (
        <div>
            <Card className="justify-center w-full h-full mt-8 bg-white fle-col">
                <CardHeader title="Retrieve Schedule Time: " color={Colors.success} />
                <CardBody color={Colors.light}>
                    <div className='flex justify-around '>
                        <Input placeholder="Search for a queue" type="time" onChange={() => console.log('search')} className={"max-w-36 b-1 bg-primary  "} />
                        <SelectionInput options={[]} onChange={() => console.log('options')} />
                        <pre className='inline-flex'>
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </CardBody>
            </Card>
        </div>
    )

}

export default Retrieve;