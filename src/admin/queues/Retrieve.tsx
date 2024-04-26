import { useEffect, useState } from "react";

import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation } from "../../utils/reactQuery";
import { updateOptions } from "../../services/options";
import { AutoQueryPayload, OptionsResponse } from '../../utils/types';
import { formatTime, parseTimeString, formatTimeReadable, timeDiff } from '../../utils/date';

import { Table } from '../../ui';
import { Colors } from '../../utils/enums';
import RetrieveForm from "./RetrieveForm";

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
        optionsMutation.mutate({
            AutoQueryHourStart: startHours,
            AutoQueryMinuteStart: startMinutes,
            AutoQueryHourStop: stopHours,
            AutoQueryMinuteStop: stopMinutes
        });
    }

    //TODO - Need to refactor than another component 
    return (
        <>
                <RetrieveForm
                    startTime={startTime}
                    stopTime={stopTime}
                    timeDelta={timeDelta}
                    handleTimeStart={(e) => handleTimeStart(e)}
                    handleTimeStop={(e) => handleTimeStop(e)}
                    onSubmit={handleSubmit}
                />
                <div className="flex mt-6">
                    <Table data={[]} columns={[]} headerColor={Colors.almond} />
                </div>
        </>
    )
}

export default Retrieve;
