import { useCustomQuery } from '../../utils/reactQuery';
import { getJobs } from '../../services/jobs';

import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import JobTable from '../../root/JobTable';
import { Colors } from '../../utils/enums';
import Spinner from '../../ui/Spinner';


// Refacto In progress

const JobRoot = () => {
  const { data: jobsInstances, isLoading: isLoadingJobs, refetch } = useCustomQuery(['jobs'], () => getJobs(), {
    enabled: true,
    refetchInterval: 10000,
  })

  console.log({ jobsInstances })



  const jobInstancesSampleId =
    [
      "0475d062-0054-4b49-b6a7-326f0b8216ef",
      "3888c8b3-271c-4c69-abd7-2b21fb373958",
      "71a1e475-d77c-449e-9092-f2ee4300088f",
      "90ed5d23-8a25-457a-a7a2-15e9f5056655",
      "9d3d5067-d297-4b88-977e-22d310ed785a",
      "9fa3a088-0eed-4f0e-b296-7684dc8a8844"
    ]

  const jobsInstancesSampleIdDetails = [
    {
      "CompletionTime": "20240308T093643.950203",
      "Content": {
        "ArchiveSize": "23730820",
        "ArchiveSizeMB": 22,
        "Description": "REST API",
        "InstancesCount": 232,
        "UncompressedSize": "68153234",
        "UncompressedSizeMB": 64
      },
      "CreationTime": "20240308T093638.421891",
      "EffectiveRuntime": 5.524,
      "ErrorCode": 0,
      "ErrorDescription": "Success",
      "ErrorDetails": "",
      "ID": "0475d062-0054-4b49-b6a7-326f0b8216ef",
      "Priority": 0,
      "Progress": 100,
      "State": "Success",
      "Timestamp": "20240308T103752.767484",
      "Type": "Archive"
    },
    {
      "CompletionTime": "20240307T182422.672952",
      "Content": {
        "ArchiveSize": "39309629",
        "ArchiveSizeMB": 37,
        "Description": "REST API",
        "InstancesCount": 166,
        "UncompressedSize": "87460012",
        "UncompressedSizeMB": 83
      },
      "CreationTime": "20240307T182417.651312",
      "EffectiveRuntime": 5.019,
      "ErrorCode": 14,
      "ErrorDescription": "Cannot write to file",
      "ErrorDetails": "Cannot add new file insIDe ZIP archive: SOtNwu INCISIX/0 Tte Dental Adulte/CT Dentascan 0.75 H60s/CT000107.dcm",
      "ID": "3888c8b3-271c-4c69-abd7-2b21fb373958",
      "Priority": 0,
      "Progress": 100,
      "State": "Failure",
      "Timestamp": "20240308T104740.392787",
      "Type": "Archive"
    },
    {
      "CompletionTime": "20240307T200324.916617",
      "Content": {
        "ArchiveSize": "23730820",
        "ArchiveSizeMB": 22,
        "Description": "REST API",
        "InstancesCount": 232,
        "UncompressedSize": "68153234",
        "UncompressedSizeMB": 64
      },
      "CreationTime": "20240307T200318.704375",
      "EffectiveRuntime": 6.209,
      "ErrorCode": 0,
      "ErrorDescription": "Success",
      "ErrorDetails": "",
      "ID": "71a1e475-d77c-449e-9092-f2ee4300088f",
      "Priority": 0,
      "Progress": 100,
      "State": "Success",
      "Timestamp": "20240308T104817.178287",
      "Type": "Archive"
    },
    {
      "CompletionTime": "20240307T200356.545195",
      "Content": {
        "ArchiveSize": "23711841",
        "ArchiveSizeMB": 22,
        "Description": "REST API",
        "InstancesCount": 232,
        "UncompressedSize": "68153234",
        "UncompressedSizeMB": 64
      },
      "CreationTime": "20240307T200352.031036",
      "EffectiveRuntime": 4.508,
      "ErrorCode": 0,
      "ErrorDescription": "Success",
      "ErrorDetails": "",
      "ID": "90ed5d23-8a25-457a-a7a2-15e9f5056655",
      "Priority": 0,
      "Progress": 100,
      "State": "Success",
      "Timestamp": "20240308T104915.965301",
      "Type": "Media"
    },
    {
      "CompletionTime": "20240307T174004.026566",
      "Content": {
        "ArchiveSize": "20414917",
        "ArchiveSizeMB": 19,
        "Description": "REST API",
        "InstancesCount": 166,
        "UncompressedSize": "87460012",
        "UncompressedSizeMB": 83
      },
      "CreationTime": "20240307T173958.483884",
      "EffectiveRuntime": 5.537,
      "ErrorCode": 14,
      "ErrorDescription": "Cannot write to file",
      "ErrorDetails": "Cannot add new file insIDe ZIP archive: SOtNwu INCISIX/0 Tte Dental Adulte/CT Dentascan 0.75 H60s/CT000056.dcm",
      "ID": "9d3d5067-d297-4b88-977e-22d310ed785a",
      "Priority": 0,
      "Progress": 100,
      "State": "Failure",
      "Timestamp": "20240308T103022.387486",
      "Type": "Archive"
    },
    {
      "CompletionTime": "20240308T093345.027177",
      "Content": {
        "ArchiveSize": "58388145",
        "ArchiveSizeMB": 55,
        "Description": "REST API",
        "InstancesCount": 680,
        "UncompressedSize": "135037788",
        "UncompressedSizeMB": 128
      },
      "CreationTime": "20240308T093329.282819",
      "EffectiveRuntime": 15.737,
      "ErrorCode": 0,
      "ErrorDescription": "Success",
      "ErrorDetails": "",
      "ID": "9fa3a088-0eed-4f0e-b296-7684dc8a8844",
      "Priority": 0,
      "Progress": 100,
      "State": "Success",
      "Timestamp": "20240308T105113.608519",
      "Type": "Archive"
    }
  ]


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