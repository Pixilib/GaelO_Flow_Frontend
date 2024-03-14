import { useCustomQuery } from '../../utils/reactQuery';
import { getJobs } from '../../services/jobs';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import JobTable from './JobTable';
import Spinner from '../../ui/Spinner';


const JobRoot = () => {
  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery(
    ['jobs'],
    () => getJobs(),
    {
      enabled: true,
      refetchInterval: 10000,
    })

  return (
    <div className="flex justify-center mt-10">
      {isLoadingJobs ? <Spinner /> :
        <Card >
          <CardHeader title='Jobs' />
          <CardBody>
            <JobTable data={jobData as any} />
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      }
    </div>
  )
}

export default JobRoot;