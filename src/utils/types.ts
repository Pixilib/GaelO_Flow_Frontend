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
  [K in keyof T]: Pick<T, K>;
}[keyof T];

export type OptionsPayload = AtLeastOne<OptionsResponse>;

export type Option = {
  value: any;
  label: string;
};

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

type StateJob =
  | "Pending"
  | "Running"
  | "Success"
  | "Failure"
  | "Paused"
  | "Retry";

export type OrthancJob = {
  Type: string;
  Progress: number;
  State: StateJob | string;
  [key: string]: any;
};

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
};
export type User = {
  Id: number;
  Firstname: string;
  Lastname: string;
  Email: string;
  RoleName: Role["Name"];
  Role: Role;
};

export type UserPayload = Omit<User, "Id" | "Role"> & { Password: string };
export type UserUpdatePayload = Partial<UserPayload>;
//auth
export type SignInResponse = {
  AccessToken: string;
  UserId: number;
};

export type ChangePasswordPayload = {
  NewPassword: string;
  ConfirmationPassword: string;
  Token: string;
  UserId: number;
};

export type Peer = {
  name: string;
  password: string;
  url: string;
  username: string;
};

export type Modality = {
  name: string;
  aet: string;
  host: string;
  port: number;
  manufacturer: string;
};

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
};

export type Label = {
  Name: string;
};

// Oauth2
export type Oauth2Config = {
  Name: string;
  Provider: string;
  AuthorizationUrl: string;
  ClientId: string;
};
//Query

type QueryStudy = {
  PatientName?: string;
  PatientID?: string;
  StudyDate?: string;
  Modality?: string;
  StudyDescription?: string;
  AccessionNb?: string;
  StudyInstanceUID?: string;
};

type QuerySeries = {
  StudyUID?: string;
  Modality?: string;
  SeriesDescription?: string;
  SeriesNumber?: string;
  SeriesInstanceUID?: string;
};

type Level = "Series" | "Study";
export type QueryPayload = {
  Level: Level;
  Query: QueryStudy | QuerySeries;
};

export type FindPayload = QueryPayload & {
  Labels: string[];
};

export type ExtendedQueryPayload = {
  queryPayload: QueryPayload;
  aet: string;
};

export type QueryResponse = {
  answerId: string;
  answerNumber: number;
  level: Level;
  originAET: string;
  patientName: string;
  patientId: string;
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
};

export type RetrieveResponse = {
  id: string;
  path: string;
};

export type OrthancImportDicom = {
  id: string;
  parentPatient: string;
  parentSeries: string;
  parentStudy: string;
};

export type Patient = {
  id: string;
  isStable: boolean;
  Labels: string[];
  lastUpdate: string;
  mainDicomTags: {
    patientBirthDate: string | null;
    patientId: string | null;
    patientName: string | null;
    patientSex: string | null;
  };
  studies: string[];
  type: string;
};

export type Series = {
  expectedNumberOfInstances: number | null;
  id: string;
  instances: string[];
  isStable: string;
  labels: string[];
  lastUpdate: string;
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
  };
  parentStudy: string;
  status: string;
  type: string;
};

export type PatientMainDicomTags = {
  patientBirthDate: string | null;
  patientId: string | null;
  patientName: string | null;
  patientSex: string | null;
};

export type StudyMainDicomTags = {
  accessionNumber: string | null;
  institutionName: string | null;
  referringPhysicianName: string | null;
  studyDate: string | null;
  studyDescription: string | null;
  studyId: string | null;
  studyInstanceUID: string;
  studyTime: string | null;
};

export type Study = {
  id: string;
  isStable: boolean;
  labels: string[];
  lastUpdate: string;
  mainDicomTags: StudyMainDicomTags;
  patientMainDicomTags: PatientMainDicomTags;
  parentPatient: string;
  series: string[];
  type: string;
};