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

export type ModalityExtended = {
    AET: string;
    AllowEcho: boolean;
    AllowEventReport: boolean;
    AllowFind: boolean;
    AllowFindWorklist: boolean;
    AllowGet: boolean;
    AllowMove: boolean;
    AllowNAction: boolean;
    AllowStore: boolean;
    AllowTranscoding: boolean;
    Host: string;
    LocalAet: string;
    Manufacturer: string;
    Port: number;
    Timeout: number;
    UseDicomTls: boolean;
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
//Query

type Level = "Series" | "Study";

export type QueryParsedPayload = {
    Level: Level;
    Query: {
        PatientName?: string;
        PatientID?: string;
        StudyDate?: string;
        ModalitiesInStudy?: string;
        StudyDescription?: string;
        AccessionNumber?: string;
        NumberOfStudyRelatedInstances?: string;
        NumberOfStudyRelatedSeries?: string;
        SeriesDescription?: string;
        SeriesInstanceUID?: string;
        SeriesNumber?: string;
        ProtocolName?: string;
    }
}

export type QueryParseResponse = {
    AnswerId: string;
    AnswerNumber: number;
    Level: Level;
    OriginAET: string;
    PatientName: string;
    PatientID: string;
    AccessionNumber: string;
    StudyDescription: string;
    StudyDate: string;
    RequestedProcedureDescription: string;
    Modality: string;
    SeriesDescription: string;
    SeriesNumber: string;
    NumberOfSeriesRelatedInstances: string;
    StudyInstanceUID: string;
    SeriesInstanceUID: string;
}