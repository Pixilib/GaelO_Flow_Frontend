
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

type StateJob = "Pending" | "Running" | "Success" | "Failure" | "Paused" | "Retry";

export type OrthancJob = {
    Type: string,
    Progress: number,
    State: StateJob | string,
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

type QueryStudy = {
    PatientName?: string;
    PatientID?: string;
    StudyDate?: string;
    Modality?: string;
    StudyDescription?: string;
    AccessionNb?: string;
    StudyInstanceUID?: string;
}

type QuerySeries = {
    StudyUID?: string;
    Modality?: string;
    SeriesDescription?: string;
    SeriesNumber?: string;
    SeriesInstanceUID?: string;
}

type Level = "Series" | "Study";
export type QueryPayload = {
    Level: Level;
    Query: QueryStudy | QuerySeries;
}

export type FindPayload = QueryPayload & {
    Labels: string[];
}

export type ExtendedQueryPayload = {
    queryPayload: QueryPayload;
    aet: string;
}

export type QueryResponse = {
    answerId: string;
    answerNumber: number;
    level: Level;
    originAET: string;
    patientName: string;
    patientID: string;
    accessionNumber: string;
    studyDescription: string;
    studyDate: string;
    requestedProcedureDescription: string;
    modality: string;
    seriesDescription: string;
    seriesNumber: string;
    numberOfSeriesRelatedInstances: string;
    studyInstanceUID: string;
    seriesInstanceUID: string;
}

export type RetrieveResponse = {
    id: string;
    path: string;
}

export type OrthancImportDicom = {
    id: string,
    parentPatient: string,
    parentSeries: string,
    parentStudy: string
}

export type Patient = {
    id: string;
    isStable: boolean;
    Labels: string[];
    lastUpdate: string;
    mainDicomTags: {
        patientBirthDate: string | null;
        patientID: string | null;
        patientName: string | null;
        patientSex: string | null;
    },
    studies: string[],
    type: string
}

export type Series = {
    expectedNumberOfInstances: number | null;
    id: string;
    instances: string[];
    isStable: string;
    labels: string[],
    lastUpdate: string,
    mainDicomTags: {
        imageOrientationPatient: string | null;
        manufacturer: string | null;
        modality: string | null;
        operatorsName: string | null;
        protocolName: string | null;
        seriesDescription: string | null;
        seriesInstanceUID: string;
        seriesNumber: string | number | null;
        stationName: string | null;
        seriesDate: string | null;
        seriesTime: string | null;
    },
    parentStudy: string;
    status: string;
    type: string;
}

export type PatientMainDicomTags = {
    patientBirthDate: string | null
    patientID: string
    patientName: string | null
    patientSex: string | null
}

export type Study = {
    id: string
    isStable: boolean
    labels: string[]
    lastUpdate: string
    mainDicomTags: {
        accessionNumber: string | null
        institutionName: string | null
        referringPhysicianName: string | null
        studyDate: string | null
        studyDescription: string | null
        studyID: string | null
        studyInstanceUID: string
        studyTime: string | null
    },
    patientMainDicomTags: PatientMainDicomTags,
    parentPatient: string,
    series: string[],
    type: string

}

//exemple of FindAnswer
// {
//     "ID" : "056aa65d-96dce3c7-4498131f-b8911156-64699216",
//     "IsStable" : true,
//     "Labels" : [],
//     "LastUpdate" : "20240621T155331",
//     "MainDicomTags" : 
//     {
//        "AccessionNumber" : "REALYSA",
//        "ReferringPhysicianName" : "",
//        "StudyDate" : "20220315",
//        "StudyDescription" : "PET0",
//        "StudyID" : "",
//        "StudyInstanceUID" : "1.2.276.0.7230010.3.1.2.1664247091.88.1703691677.1279636",
//        "StudyTime" : "114919"
//     },
//     "ParentPatient" : "89083e2b-c811de66-692d1fe7-cda37cfe-9805effd",
//     "PatientMainDicomTags" : 
//     {
//        "PatientBirthDate" : "19000101",
//        "PatientID" : "202200419918105350042",
//        "PatientName" : "19918105350042",
//        "PatientSex" : "F"
//     },
//     "Series" : 
//     [
//        "5e64bb6f-d4f18a56-4b5077e6-1c2d80c3-f6e8450a",
//        "7d909a90-dbf2d491-36ea8164-bdccec80-c22d3381"
//     ],
//     "Type" : "Study"
//  },
export type FindAnswer = {
    id: string;
    isStable: boolean;
    labels: string[];
    lastUpdate: string;
    mainDicomTags: {
        accessionNumber: string;
        institutionName: string | null
        referringPhysicianName: string;
        studyDate: string;
        studyDescription: string;
        studyID: string;
        studyInstanceUID: string;
        studyTime: string;
    };
    parentPatient: string;
    patientMainDicomTags: {
        patientBirthDate: string;
        patientID: string;
        patientName: string;
        patientSex: string;
    };
    series: string[];
    type: string;
}

// {
//     id: '056aa65d-96dce3c7-4498131f-b8911156-64699216',
//     isStable: true,
//     labels: [],
//     lastUpdate: '20240621T165031',
//     mainDicomTags: {
//       accesionNumber: 'REALYSA',
//       referringPhysicianName: '',
//       studyDate: '20220315',
//       studyDescription: 'PET0',
//       studyID: '',
//       studyInstanceUID: '1.2.276.0.7230010.3.1.2.1664247091.88.1703691677.1279636',
//       studyTime: '114919'
//     },
//     parentPatient: '89083e2b-c811de66-692d1fe7-cda37cfe-9805effd',
//     patientMainDIcomTags: {
//       patientBirthDate: '19000101',
//       patientID: '202200419918105350042',
//       patientName: '19918105350042',
//       patientSex: 'F'
//     },
//     series: [
//       '5e64bb6f-d4f18a56-4b5077e6-1c2d80c3-f6e8450a', '7d909a90-dbf2d491-36ea8164-bdccec80-c22d3381'
//     ],
//     type: 'Study'
//   }