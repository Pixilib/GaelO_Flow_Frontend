//option
export type AutoQueryPayload = {
    AutoQueryHourStart: number;
    AutoQueryMinuteStart: number;
    AutoQueryHourStop: number;
    AutoQueryMinuteStop: number;
};

// ? we can use this type to validate the payload who check if object contains properties of OptionsResponse
//! For now we don't need to use this type
type AtLeastOne<T> = {
    [K in keyof T]: Pick<T, K>
}[keyof T];

export type OptionsPayload = AtLeastOne<OptionsResponse>;

export type Option = {
    value: any
    label: string
}

// * This is the response from the API getOptions
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

//Job
export type PostJobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobPayload = {
    Id: string;
    Action: PostJobsAction;
};

export type OrthancJob = {
    Type: string,
    Progress: number,
    State: string
    [key: string]: any
}

//User
/**
 * @typedef RoleUser
 * Represent all the roles that a user can have
 */
type RoleUser = {
    Name: string;
    Import: boolean;
    Anonymize: boolean;
    Export: boolean;
    Query: boolean;
    AutoQuery: boolean;
    Delete: boolean;
    Admin: boolean;
    Modify: boolean;
    CdBurner: boolean;
    AutoRouting: boolean;
}
/**
 * @typedef User
 * Represent a user with all fields who need
 */
type User = {
    Id: number;
    Firstname: string;
    Lastname: string;
    Username: string;
    Email: string;
    SuperAdmin: boolean;
    RoleName: string;
    Role: RoleUser;
}
/**
 * @typedef UserResponse
 * Represent a list of Users
 * Response from the API get users
 */
export type UserResponse = User[];


//auth
export type SignInResponse = {
    AccessToken: string;
    UserId: number;
}

// export type SignUpResponse = {
//      ?
// }

// export type lostPasswordResponse = {
//     ?
// }

export type ChangePasswordVariables = {
    NewPassword: string;
    ConfirmationPassword: string;
    Token: string;
    UserId: number;
}
// export type changePasswordResponse = {
//     ?
// }

