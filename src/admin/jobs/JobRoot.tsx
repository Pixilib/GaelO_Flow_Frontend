import { useQueryClient } from '@tanstack/react-query';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { getJobs, postJobs } from '../../services/jobs';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import JobTable from './JobTable';
import Spinner from '../../ui/Spinner';

const JobRoot = () => {
  const queryClient = useQueryClient();
  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery(
    ['jobs'],
    () => getJobs(),
    {
      enabled: true,
      refetchInterval: 10000,
    })

  const { mutate } = useCustomMutation(
    ({id, action}) => postJobs(id, action),
    [], {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['jobs']})
    },
    onError: (e:Error) => {
      console.log('error: ',e)
    }
  })

  const handleJobAction = (id:any, action:any) => {
    mutate({ id, action });
  };
  

  return (
    <div className="flex justify-center h-full mt-10">
      <Card >
        <CardHeader title='Jobs' />
        <CardBody>
          {isLoadingJobs ? <Spinner /> : <JobTable data={jobData as any} onJobAction={handleJobAction} />}
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  )
}

export default JobRoot;