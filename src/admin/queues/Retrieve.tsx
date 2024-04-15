import { IoMdSend as SendIcon } from "react-icons/io";
import { Card, CardHeader, CardBody, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';
import { OptionsResponse } from '../../utils/types';
import Input2 from '../../ui/Input2';
import { hoursMinsToString, stringToHoursMinutes, timeDiff } from '../../utils/date';
import { useEffect, useState } from 'react';

// !WIP
type RetrieveProps = {
    data: OptionsResponse;
}

const Retrieve = ({ data }: RetrieveProps) => {
    const [startTime, setStartTime] = useState("");
    const [stopTime, setStopTime] = useState("");
    const [timeDelta, setTimeDelta] = useState(timeDiff(startTime, stopTime));

    useEffect(() => {
        const optionClockStart = hoursMinsToString(data.AutoQueryHourStart, data.AutoQueryMinuteStart);
        const optionClockStop = hoursMinsToString(data.AutoQueryHourStop, data.AutoQueryMinuteStop);
        setStartTime(optionClockStart);
        setStopTime(optionClockStop);
        setTimeDelta(stringToHoursMinutes(timeDiff(optionClockStart, optionClockStop)));
    }, [data]);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'stop') => {
        const value = event.target.value;
        console.log({ value, type, startTime, stopTime, timeDelta })
        if (type === 'start') {
            setStartTime(value);
            console.log({ value, startTime, stopTime })
            setTimeDelta(stringToHoursMinutes(timeDiff(value, stopTime)));
        } else {
            setStopTime(value);
            setTimeDelta(stringToHoursMinutes(timeDiff(startTime, value)));
        }
    };

    return (
        <div data-gaelo-flow="Retrieve-Container-Queues" className="flex flex-col items-center justify-center">
            <Card className="w-3/4 mt-8 bg-white ">
                <CardHeader title="Retrieve Schedule Time: " color={Colors.success} />
                <CardBody color={Colors.light}>
                    <div className='relative flex items-center justify-between mt-6'>
                        <Input2
                            type="time"
                            label={{ value: 'Start Time', className: 'text-center', align: 'center' }}
                            size={'lg'} variant={Colors.primary} value={startTime}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(event, 'start')}
                            className={"bg-gray-100 text-gray-400 focus:text-dark focus:shadow-2xl shadow-lg"}
                        />
                        <Input2
                            type="time"
                            label={{ value: 'Stop Time', className: 'text-center', align: 'center' }}
                            size={'lg'} variant={Colors.primary} value={stopTime}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(event, 'stop')}
                            className={"bg-gray-100 text-gray-400 focus:text-dark focus:shadow-2xl shadow-lg"}
                        />
                        <Badge
                            value={timeDelta}
                            className={`
                            rounded-full bg-[#CDFFCD] shadow-lg
                            text-black h-14 w-32 text-nowrap flex items-center text-sm
                            `}
                        />
                    </div>
            

                </CardBody>
            </Card>
                    <div className="flex justify-center mt-6">
                        <Button color={Colors.success} className="w-32 gap-2 px-8 text-center">
                            <span> <SendIcon /> </span>
                            <span> Send </span>
                        </Button>
                    </div>
        </div>
    )
}

export default Retrieve;
