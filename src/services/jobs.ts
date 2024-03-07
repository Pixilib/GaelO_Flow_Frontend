import axios from "axios";


export type Job = {
  CompletionTime: string;
  Content: Content;
  CreationTime: string;
  EffectiveRuntime: number;
  ErrorCode: number;
  ErrorDescription: string;
  ErrorDetails: string;
  ID: string;
  Priority: number;
  Progress: number;
  State: string;
  Timestamp: string;
  Type: string;
}

export type Content = {
  ArchiveSize?: string;
  ArchiveSizeMB?: number;
  Description: string;
  InstancesCount: number;
  UncompressedSize?: string;
  UncompressedSizeMB?: number;
  FailedInstancesCount?: number;
  IsAnonymization?: boolean;
  ParentResources?: string[];
}

export const getJobs = (): Promise<unknown> => {
  return axios.get("api/jobs",
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
    .then(response => response.data)
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};