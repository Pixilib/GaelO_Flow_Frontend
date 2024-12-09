import { Colors, useCustomMutation } from '../utils';
import { MouseEvent, useState } from 'react';
import ProgressJobs from './ProgressJobs';
import { makeRetrieve } from '../services';
import { Download } from '../icons';


/**
 * A button component used for retrieving data. 
 * Retrieve data when the button is clicked
 * Retrieve studies or series data.
 * @param answerId - The ID of the answer.
 * @param answerNumber - The number of the answer.
 * @returns The RetrieveButton component.
*/
type RetrieveButtonProps = {
  answerId: string;
  answerNumber: number;
};
const RetrieveButton = ({ answerId, answerNumber }: RetrieveButtonProps) => {

  const [jobId, setJobId] = useState<string | null>(null);

  const { mutateAsync: retrieveMutation } = useCustomMutation<any, any>(
    () => makeRetrieve(answerId, answerNumber),
    [],
    {
      onSuccess: (data) => {
        setJobId(data.id);
      }
    }
  );

  const handleClick = (event: MouseEvent<SVGAElement>) => {
    event.stopPropagation()
    if (jobId) return
    retrieveMutation({})
  }
  return (
    <div className="flex justify-center">
      {jobId ?
        <ProgressJobs jobId={jobId} />
        :
        <Download
          color={Colors.warning}
          onClick={handleClick}
          size="2.5em"
          className={`transition-transform transform cursor-pointer hover:text-warning-500 hover:scale-110 `}
        />
      }

    </div>
  );
};

export default RetrieveButton;
