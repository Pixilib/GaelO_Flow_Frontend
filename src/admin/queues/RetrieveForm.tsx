import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Input, Label, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';
import { Send } from '../../icons';

type RetrieveCardProps = {
  startTime: string;
  stopTime: string;
  timeDelta: string;
  handleTimeStart: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeStop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RetrieveForm = ({
  startTime,
  stopTime,
  timeDelta,
  handleTimeStart,
  handleTimeStop,
  onSubmit,
}: RetrieveCardProps) => {
  return (
    <form onSubmit={onSubmit} data-gaelo-flow="retrieve-container-queues" className="flex flex-col items-center justify-around w-full">
      <Card className="w-11/12 mt-8 border">
        <CardHeader title="Retrieve Schedule Time:" color={Colors.success} />
        <CardBody color={Colors.secondary}>
          <div className='grid items-center gap-4 md:grid-cols-1 lg:grid-cols-3'>
            <Input
              type="time"
              label={<Label value="Start Time" className="flex justify-center mb-3 font-semibold" />}
              value={startTime}
              onChange={handleTimeStart}
              className=""
            />
            <Input
              type="time"
              label={<Label value="Stop Time" className="flex justify-center mb-3 font-semibold" />}
              value={stopTime}
              onChange={handleTimeStop}
              className=""
            />
            <div className="flex-col text-center gap-y-4c">
              <Label value="Total Time" className="mt-8 font-semibold" />
              <Badge
                value={timeDelta}
                className="bg-[#CDFFCD] text-black rounded-full"
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center bg-white">
          <Button color={Colors.success} type="submit" className="w-36">
            <Send /> Send
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RetrieveForm;
