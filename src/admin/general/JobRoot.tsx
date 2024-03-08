import { useCustomQuery } from '../../utils/reactQuery';
import { getJobs } from '../../services/jobs';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import JobTable from '../../root/JobTable';
import Spinner from '../../ui/Spinner';
import { Colors } from '../../utils/enums';


// !Refacto In progress add mutation for restart job ect...
const JobRoot = () => {
  const { data: jobsInstances, isLoading: isLoadingJobs, refetch } = useCustomQuery(['jobs'], () => getJobs(), {
    enabled: true,
    refetchInterval: 10000,
  })

  return (
    <div className="mt-10 flex justify-center">
      <Card >
        <CardHeader title='Jobs Instances' />        
        <CardBody>
          {isLoadingJobs ? <Spinner/> :<JobTable data={jobsInstances} />}
        </CardBody>
        <CardFooter>
          <Button onClick={() => refetch()} color={Colors.secondary}>Refresh</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default JobRoot;