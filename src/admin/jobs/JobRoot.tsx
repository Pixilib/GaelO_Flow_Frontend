import JobTable from "./JobTable";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import Spinner from "../../ui/Spinner";

import { Colors } from "../../utils/enums";
import { OrthancJob } from "../../utils/types2";
import { useCustomQuery } from "../../utils/reactQuery";
import { getJobs } from "../../services/jobs";

const JobRoot = () => {

  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<
    OrthancJob[]
  >(["jobs"], () => getJobs(), {
    enabled: true,
    refetchInterval: 10000,
  });

  if (isLoadingJobs) return <Spinner />;

  return (
    <div className="flex justify-center w-full h-full">
      <Card className="w-full bg-white">
        <CardHeader title="Jobs" color={Colors.primary} />
        <CardBody>
          <JobTable data={jobData ?? []} />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default JobRoot;
