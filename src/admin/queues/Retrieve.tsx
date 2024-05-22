import { useEffect, useState } from "react";
import { IoMdSend as SendIcon } from "react-icons/io";
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

const Retrieve = ({ data }: RetrieveProps) => {
    const [startTime, setStartTime] = useState("");
    const [stopTime, setStopTime] = useState("");
    const [timeDelta, setTimeDelta] = useState("");

    const { toastSuccess, toastError } = useCustomToast();
    const optionsMutation = useCustomMutation<void, AutoQueryPayload>(
        ({ AutoQueryHourStart, AutoQueryMinuteStart, AutoQueryHourStop, AutoQueryMinuteStop }: AutoQueryPayload) =>
            updateOptions({ AutoQueryHourStart, AutoQueryMinuteStart, AutoQueryHourStop, AutoQueryMinuteStop }),
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
