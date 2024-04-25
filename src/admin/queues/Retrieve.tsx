import { useEffect, useState } from "react";
import { IoMdSend as SendIcon } from "react-icons/io";
import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation } from "../../utils/reactQuery";
import { updateOptions } from "../../services/options";
import { AutoQueryPayload, OptionsResponse } from '../../utils/types';
import { formatTime, parseTimeString, formatTimeReadable, timeDiff } from '../../utils/date';
import { Card, CardHeader, CardBody, Badge, Button, Input, Label, Table } from '../../ui';
import { Colors } from '../../utils/enums';

type RetrieveProps = {
    data: OptionsResponse;
}

const Retrieve = ({ data }: RetrieveProps) => {
    const [startTime, setStartTime] = useState("");
    const [stopTime, setStopTime] = useState("");
    const [timeDelta, setTimeDelta] = useState("");

    const { toastSuccess, toastError } = useCustomToast();
    const optionsMutation = useCustomMutation<void, AutoQueryPayload>(
        payload => updateOptions(payload),
        [["options"]],
        {
            onSuccess: () => toastSuccess("Options updated successfully"),
            onError: error => {
                const errorMessage = error.data?.message || "An error occurred during updating options.";
                toastError(errorMessage);
            },
        }
    );

    useEffect(() => {
        const start = formatTime(data.AutoQueryHourStart, data.AutoQueryMinuteStart);
        const stop = formatTime(data.AutoQueryHourStop, data.AutoQueryMinuteStop);
        setStartTime(start);
        setStopTime(stop);
        setTimeDelta(formatTimeReadable(timeDiff(start, stop)));
    }, [data]);

    const handleTimeChange = (isStart: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (isStart) {
            setStartTime(newValue);
            setTimeDelta(formatTimeReadable(timeDiff(newValue, stopTime)));
        } else {
            setStopTime(newValue);
            setTimeDelta(formatTimeReadable(timeDiff(startTime, newValue)));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const start = parseTimeString(startTime);
        const stop = parseTimeString(stopTime);
        optionsMutation.mutate({
            AutoQueryHourStart: start.hours,
            AutoQueryMinuteStart: start.minutes,
            AutoQueryHourStop: stop.hours,
            AutoQueryMinuteStop: stop.minutes
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <Card className="w-11/12 mt-8 border">
                <CardHeader title="Retrieve Schedule Time" color={Colors.success} />
                <CardBody color={Colors.light}>
                    <div className='flex items-center justify-around gap-12 mt-1'>
                        <Input
                            type="time"
                            label={<Label value="Start Time" className="text-sm font-medium text-center" align="center" spaceY={2} />}
                            value={startTime}
                            onChange={handleTimeChange(true)}
                            className="shadow-lg focus:shadow-2xl"
                        />
                        <Input
                            type="time"
                            label={<Label value="Stop Time" className="text-sm font-medium text-center" align="center" spaceY={2} />}
                            value={stopTime}
                            onChange={handleTimeChange(false)}
                            className="text-gray-400 bg-gray-100 shadow-lg focus:text-dark focus:shadow-2xl"
                        />
                        <div className="flex-col text-center">
                            <label className="text-sm font-bold">Total Time</label>
                            <Badge
                                value={timeDelta}
                                className="rounded-full bg-[#CDFFCD] shadow-lg text-black h-10 w-auto flex items-center text-sm mt-2"
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
            <div className="flex justify-center mt-6">
                <Button color={Colors.success} className="w-32 gap-2 px-8 text-center" type="submit">
                    <SendIcon /><span>Send</span>
                </Button>
            </div>
            <div className="flex mt-6">
                <Table data={[]} columns={[]} headerColor={Colors.almond} />
            </div>
        </form>
    );
};

export default Retrieve;
