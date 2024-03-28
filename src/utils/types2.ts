
export type postJobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobMutationVariables = {
    id: string;
    action: postJobsAction;
  };
  
export type OrthancJob = {
    Type :string,
    Progress : number,
    State : string
    [key :string] : any
}

