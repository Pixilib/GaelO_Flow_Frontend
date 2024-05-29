import { useEffect, useState } from "react";

import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation } from "../../utils/reactQuery";
import { updateOptions } from "../../services/options";
import { AutoQueryPayload, OptionsResponse } from '../../utils/types';
import { formatTime, formatTimeReadable, parseTimeString, timeDiff } from '../../utils/moment';
import { IoMdSend as SendIcon } from "react-icons/io";
import { Card, CardHeader, CardBody, Badge, Button, Table, Input, Label } from '../../ui';
import { Colors } from '../../utils/enums';

type RetrieveProps = {
    data: OptionsResponse;
}

//* This component works get the data, update the data with form
//TODO - Need to refactor the code in differents components
const Retrieve = ({ data }: RetrieveProps) => {
    const [startTime, setStartTime] = useState("");
    const [stopTime, setStopTime] = useState("");
    const [timeDelta, setTimeDelta] = useState(timeDiff(startTime, stopTime));
    const { toastSuccess, toastError } = useCustomToast();

    useEffect(() => {
        const optionClockStart = formatTime(data.AutoQueryHourStart, data.AutoQueryMinuteStart);
        const optionClockStop = formatTime(data.AutoQueryHourStop, data.AutoQueryMinuteStop);
        setStartTime(optionClockStart);
        setStopTime(optionClockStop);
        setTimeDelta(formatTimeReadable(timeDiff(optionClockStart, optionClockStop)));
    }, [data]);

    const optionsMutation = useCustomMutation<void, AutoQueryPayload>(
        ({ AutoQueryHourStart, AutoQueryMinuteStart, AutoQueryHourStop, AutoQueryMinuteStop }: AutoQueryPayload) =>
             updateOptions({ AutoQueryHourStart, AutoQueryMinuteStart, AutoQueryHourStop, AutoQueryMinuteStop }),
        [["options"]],
        {
            onSuccess: () => {
                toastSuccess("Options updated successfully");
            },
            onError: (error: any) => {
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during updating options.");
                }
            },
        }
    );

    const handleTimeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStartTime(value);
        setTimeDelta(formatTimeReadable(timeDiff(value, stopTime)));
    }

    const handleTimeStop = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStopTime(value);
        setTimeDelta(formatTimeReadable(timeDiff(startTime, value)));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { hours: startHours, minutes: startMinutes } = parseTimeString(startTime);
        const { hours: stopHours, minutes: stopMinutes } = parseTimeString(stopTime);
        optionsMutation.mutate({ AutoQueryHourStart: startHours, AutoQueryMinuteStart: startMinutes, AutoQueryHourStop: stopHours, AutoQueryMinuteStop: stopMinutes });
    }

    return (
        <form onSubmit={handleSubmit} data-gaelo-flow="retrieve-container-queues" className="flex flex-col items-center w-full">
            <Card className="w-11/12 mt-8 border rounded-full">
                <CardHeader title="Retrieve Schedule Time: " color={Colors.success} />
                <CardBody color={Colors.light}>
                    <div className='flex items-center justify-around gap-12 mt-1'>
                        <Input
                            type="time"
                            label={<Label value={"Start Time"} className="text-sm font-medium text-center" align="center" spaceY={2}  />}
                            value={startTime}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTimeStart(event)}
                            className={"focus:shadow-2xl shadow-lg"}
                        />
                        <Input
                            type="time"
                            label={<Label value={"Stop Time"} className="text-sm font-medium text-center " align="center" spaceY={2} />}
                            value={stopTime}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTimeStop(event)}
                            className={"bg-gray-100 text-gray-400 focus:text-dark focus:shadow-2xl shadow-lg"}
                        />
                        <div className="flex-col text-center">
                            <label htmlFor="time-delta" className="text-sm text-bold"> Total Time</label>
                            <Badge
                                value={timeDelta}
                                className={`
                                rounded-full bg-[#CDFFCD] shadow-lg 
                              text-black h-10 w-auto text-nowrap
                                flex items-center text-sm mt-2
                               `}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
            <div className="flex justify-center mt-6">
                <Button color={Colors.success} className="w-32 gap-2 px-8 text-center" type="submit">
                    <span><SendIcon /></span>
                    <span>Send</span>
                </Button>
            </div>
            <div className="flex mt-6">
                <Table data={[]} columns={[]} headerColor={Colors.almond} />
            </div>
        </form>
    )
}

export default Retrieve;