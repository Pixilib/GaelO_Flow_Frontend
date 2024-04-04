
//Job
export type JobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobMutationPayload = {
    Id: string;
    Action: JobsAction;
  };
  
export type OrthancJob = {
    Type :string,
    Progress : number,
    State : string
    [key :string] : any
}


//auth
export type SignInResponse = {
    AccessToken : string;
    UserId:number;
}

// export type SignUpResponse = {
//?
// }

// export type lostPasswordResponse = {
//     ?
// }

export type ChangePasswordVariables = {
    NewPassword : string;
    ConfirmationPassword : string;
    Token : string;
    UserId : number;
}
// export type changePasswordResponse = {
//     ?
// }

