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
export type JobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobPayload = {
    Id: string;
    Action: JobsAction;
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
export type RoleUser = {
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
    ReadAll: boolean;
}
export type RolesUserResponse = RoleUser[];
/**
 * @typedef User
 * Represent a user with all fields who need
 */
export type User = {
    Id: number;
    Firstname: string;
    Lastname: string;
    Email: string;
    RoleName: string;
    Role: RoleUser;
}
/**
 * @typedef UserResponse
 * Represent a list of Users
 * Response from the API get users
 */
export type UserResponse = User[];
export type UserPayload = Omit<User, "Id" | "Role"> & { Password: string };
export type UserUpdatePayload = Partial<UserPayload>;
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

//labels


export interface Peer {
    name: string;
    password: string;
    url: string;
    username: string;
}

export interface Modality {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

export interface Label {
    name: string;
}