import React, { useEffect, useMemo, useState } from "react";
import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation } from "../../utils/reactQuery";
import { updateAutoQueryOptions } from "../../services/options";
import { AutoQueryOptionsPayload, Options } from "../../utils/types";
import {
  formatTime,
  formatTimeReadable,
  parseTimeString,
  timeDiff,
} from "../../utils/moment";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Table,
  Input,
  Label,
} from "../../ui";
import { Colors } from "../../utils/enums";
import { Send } from "../../icons";
import RetrieveQueues from "./RetrieveQueues";

type RetrieveProps = {
  data: Options;
};

const Retrieve = ({ data }: RetrieveProps) => {
  const { toastSuccess, toastError } = useCustomToast();

  const [startTime, setStartTime] = useState<string | null>(null);
  const [stopTime, setStopTime] = useState<string | null>(null);

  const timeDelta = useMemo(() => {
    if (!startTime || !stopTime) return null;
    return formatTimeReadable(timeDiff(startTime, stopTime));
  }, [startTime, stopTime]);

  useEffect(() => {
    const optionClockStart = formatTime(
      data.autoQueryHourStart,
      data.autoQueryMinuteStart
    );
    const optionClockStop = formatTime(
      data.autoQueryHourStop,
      data.autoQueryMinuteStop
    );
    setStartTime(optionClockStart);
    setStopTime(optionClockStop);
  }, [JSON.stringify(data)]);

  const optionsMutation = useCustomMutation<void, AutoQueryOptionsPayload>(
    (autoQueryPayload: AutoQueryOptionsPayload) => updateAutoQueryOptions(autoQueryPayload),
    [["options"]],
    {
      onSuccess: () => {
        toastSuccess("Options updated successfully");
      },
      onError: (error: any) => {
        toastError(
          "An error occurred during updating options." +
            (error?.data?.message ?? "")
        );
      },
    }
  );

  const handleTimeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStartTime(value);
  };

  const handleTimeStop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStopTime(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!startTime || !stopTime) return;
    const { hours: startHours, minutes: startMinutes } =
      parseTimeString(startTime);
    const { hours: stopHours, minutes: stopMinutes } =
      parseTimeString(stopTime);
    optionsMutation.mutate({
      autoQueryHourStart: startHours,
      autoQueryMinuteStart: startMinutes,
      autoQueryHourStop: stopHours,
      autoQueryMinuteStop: stopMinutes,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-gaelo-flow="retrieve-container-queues"
      className="w-full rounded-br-xl rounded-bl-xl"
    >
      <Card bordered>
        <CardHeader centerTitle 
        title="Retrieve Schedule Time : " color={Colors.success} />
        <CardBody 
        color={Colors.light} roundedBottomLeft roundedBottomRight
        className="dark:bg-neutral-800 dark:text-white">
          <div className="flex flex-col items-center justify-between gap-4 mt-1 sm:flex-row sm:gap-12">
            <Input
              type="time"
              label={
                <Label
                  value={"Start Time"}
                  className="text-sm font-medium text-center"
                  align="center"
                />
              }
              value={startTime ?? undefined}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleTimeStart(event)
              }
              className={"focus:shadow-2xl w-full sm:w-auto"}
            />
            <Input
              type="time"
              label={
                <Label
                  value={"Stop Time"}
                  className="text-sm font-medium text-center"
                  align="center"
                />
              }
              value={stopTime ?? undefined}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleTimeStop(event)
              }
              className={
                "bg-gray-100 text-gray-400 focus:text-primary focus:shadow-2xl w-full sm:w-auto"
              }
            />
            <div className="flex flex-col w-full text-center sm:w-auto">
              <label 
                    htmlFor="time-delta" 
                    className="justify-center text-sm font-bold">
                Total Time
              </label>
              <Badge
                value={timeDelta ?? ""}
                className={`
                  rounded-full bg-[#CDFFCD] 
                  text-black h-10 w-auto text-nowrap
                  flex items-center text-sm mt-2
                `}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              color={Colors.success}
              className="w-32 gap-2 px-8 text-center"
              type="submit"
            >
              <span>
                <Send />
              </span>
              <span>Send</span>
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="mt-6 overflow-x-auto">
        <RetrieveQueues/>
      </div>
    </form>
  );
};

export default Retrieve;
