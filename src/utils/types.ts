//option
export type Option = {
    value : any
    label : string
}
//Job
export type PostJobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobMutationVariables = {
    Id: string;
    Action: PostJobsAction;
  };
  
export type OrthancJob = {
    Type :string,
    Progress : number,
    State : string
    [key :string] : any
}

//Options
export type OptionsResponse = {
    AutoQueryHourStart: number;
    AutoQueryMinuteStart: number;
    AutoQueryHourStop: number;
    AutoQueryMinuteStop: number;
    OrthancMonitoringRate: number;
    BurnerStarted: boolean;
    BurnerLabelPath: string;
    BurnerMonitoringLevel: string;
    BurnerManifacturer: string;
    BurnerMonitoredPath: string;
    BurnerDeleteStudyAfterSent: boolean;
    BurnerSupportType: string;
    BurnerViewerPath: string;
    BurnerTransferSyntax: string;
    BurnerDateFormat: string;
    BurnerTranscoding: string;
    AutorouterStarted: boolean;
    OrthancAddress: string;
    OrthancPort: string;
    OrthancUsername: string;
    OrthancPassword: string;
    RedisAddress: string;
    RedisPort: string;
};




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

