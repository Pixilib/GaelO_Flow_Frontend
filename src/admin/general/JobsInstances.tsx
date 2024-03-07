import { useCustomQuery } from '../../utils/reactQuery';
import { getJobs } from '../../services/jobs';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import { Colors } from '../../utils/enums';


const JobInstances = () => {
    const { data: jobsInstances, isLoading:isLoadingJobs, refetch } = useCustomQuery(['jobsInstances'], () => getJobs(), {
        enabled: true,
    })

    console.log({ jobsInstances })

    if (isLoadingJobs) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Card>
                <CardHeader title='Jobs Instances' />
                <h1>
                Job instances
                </h1>
                <CardBody>
                    <div className='flex flex-col'>
                        <div>
                            {jobsInstances}
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button onClick={() => refetch()} color={Colors.secondary}>Refresh</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default JobInstances;