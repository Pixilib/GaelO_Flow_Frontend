import { BiDownload } from 'react-icons/bi';
import { Colors, useCustomMutation } from '../utils';
import { MouseEvent, useState } from 'react';
import ProgressJobs from './ProgressJobs';
import { makeRetrieve } from '../services';


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
  console.log("RetrieveButton Props:", { answerId, answerNumber }); // Log les props pour vérifier les valeurs

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
    console.log("Retrieve data")
    retrieveMutation({})
  }
  return (
    <div className="flex justify-center">
      {jobId ?
        <ProgressJobs jobId={jobId} />
        :
        <BiDownload
          color={Colors.warning}
          onClick={handleClick}
          size="2.5em"
          className="transition-transform transform cursor-pointer hover:text-warning-500 hover:scale-110"
        />
      }

    </div>
  );
};

export default RetrieveButton;
