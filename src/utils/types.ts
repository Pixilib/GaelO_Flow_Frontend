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

export type Role = {
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
export type User = {
    Id: number;
    Firstname: string;
    Lastname: string;
    Email: string;
    RoleName: Role["Name"];
    Role: Role;
}

export type UserPayload = Omit<User, "Id" | "Role"> & { Password: string };
export type UserUpdatePayload = Partial<UserPayload>;
//auth
export type SignInResponse = {
    AccessToken: string;
    UserId: number;
}

export type ChangePasswordPayload = {
    NewPassword: string;
    ConfirmationPassword: string;
    Token: string;
    UserId: number;
}

export type Peer = {
    name: string;
    password: string;
    url: string;
    username: string;
}

export type Modality = {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

export type Label = {
    Name: string;
}

// Oauth2 
export type Oauth2Config = {
    Name: string;
    Provider: string;
    AuthorizationUrl: string;
    ClientId: string;
}