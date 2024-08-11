//option
export type AutoQueryOptionsPayload = {
  autoQueryHourStart: number;
  autoQueryMinuteStart: number;
  autoQueryHourStop: number;
  autoQueryMinuteStop: number;
};

// ? we can use this type to validate the payload who check if object contains properties of OptionsResponse
//! For now we don't need to use this type
type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T];

export type OptionsPayload = AtLeastOne<OptionsRequest>;
// * This is the response from the API getOptions
type OptionsRequest = {
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

export type Option = {
  value: any;
  label: string;
};

export type Options = {
  autoQueryHourStart: number;
  autoQueryMinuteStart: number;
  autoQueryHourStop: number;
  autoQueryMinuteStop: number;
  orthancMonitoringRate: number;
  burnerStarted: boolean;
  burnerLabelPath: string;
  burnerMonitoringLevel: string;
  burnerManifacturer: string;
  burnerMonitoredPath: string;
  burnerDeleteStudyAfterSent: boolean;
  burnerSupportType: string;
  burnerViewerPath: string;
  burnerTransferSyntax: string;
  burnerDateFormat: string;
  burnerTranscoding: string;
  autorouterStarted: boolean;
  orthancAddress: string;
  orthancPort: string;
  orthancUsername: string;
  orthancPassword: string;
  redisAddress: string;
  redisPort: string;
};

//Job
export type JobsAction = "resume" | "pause" | "cancel" | "resubmit";

export type JobPayload = {
  id: string;
  action: JobsAction;
};

type StateJob =
  | "Pending"
  | "Running"
  | "Success"
  | "Failure"
  | "Paused"
  | "Retry";

export type OrthancJob = {
  id: string;
  type: string;
  progress: number;
  state: StateJob | string;
  //TODO: AJOUTER LES PROPIETE MANQUANTE ET UPDATER LES SERVICE API POUR LES FILL
};

export type Role = {
  name: string;
  import: boolean;
  anonymize: boolean;
  export: boolean;
  query: boolean;
  autoQuery: boolean;
  delete: boolean;
  admin: boolean;
  modify: boolean;
  cdBurner: boolean;
  autoRouting: boolean;
  readAll: boolean;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roleName: Role["name"];
  role: Role;
};

export type UserPayload = Omit<User, "id" | "role"> & { password: string };
export type UserUpdatePayload = Partial<UserPayload>;

export type SignInResponse = {
  accessToken: string;
  userId: number;
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

//TODO : camelCase
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
  name: string;
};

// Oauth2
export type Oauth2Config = {
  name: string;
  provider: string;
  authorizationUrl: string;
  clientId: string;
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

export type SeriesMainDicomTags = {
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

export type PatientMainDicomTags = {
  patientBirthDate: string | null;
  patientId: string;
  patientName: string | null;
  patientSex: string | null;
};

export type StudyMainDicomTags = {
  accessionNumber: string | null;
  institutionName?: string | null;
  referringPhysicianName?: string | null;
  studyDate: string | null;
  studyDescription: string | null;
  studyId: string | null;
  studyInstanceUID: string;
  studyTime: string | null;
};

export type Series = {
  expectedNumberOfInstances: number | null;
  id: string;
  instances: string[];
  isStable: boolean;
  labels: string[];
  lastUpdate: string;
  mainDicomTags: SeriesMainDicomTags;
  parentStudy: string;
  status: string;
  type: string;
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

export type PatientPayload = {
  replace: Partial<PatientMainDicomTags>;
  remove: string[];
  removePrivateTags: boolean;
  force: boolean;
  synchronous: boolean;
  keepSource: boolean;
};

export type OrthancResponse = {
  id: string;
  path: string;
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

export type StudyPayload = {
  replace: Partial<StudyMainDicomTags>;
  remove: string[];
  removePrivateTags: boolean;
  force: boolean;
  synchronous: boolean;
  keepSource: boolean;
};

export type SeriesPayload = {
  replace: Partial<SeriesMainDicomTags>;
  remove: string[];
  removePrivateTags: boolean;
  keepSource: boolean;
  force: boolean;
  synchronous: boolean;
};
