
export type postJobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type OrthancJob = {
    Type :string,
    Progress : number,
    State : string
    [key :string] : any
}