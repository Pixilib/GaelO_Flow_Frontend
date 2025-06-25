//option
export type AutoQueryOptionsPayload = {
  autoQueryHourStart: number;
  autoQueryMinuteStart: number;
  autoQueryHourStop: number;
  autoQueryMinuteStop: number;
};

export type AnonymizeOptionPayload = {
  anonymizeKeepLabels: boolean;
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
  keepLabel: boolean;
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
  completionTime: string;
  content: Record<string, any>;
  creationTime: string;
  effectiveRuntime: number;
  errorCode: number;
  errorDescription: string;
  errorDetails: string;
  priority: number;
  timestamp: string;
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
  roleName: Role["name"]|null;
  role?: Role|null;
};

export type UserPayload = Omit<User, "id" | "role"> & { password: string };
export type UserUpdatePayload = Partial<UserPayload>;

export type SignInResponse = {
  accessToken: string;
  userId: number;
};

export type ProcessingJob = {
  progress: number;
  state: string;
  id: string;
  results: Record<string, any>;
  userId: number;
  type: string;
  payload: object[];
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
  name: string;
  aet: string;
  allowEcho: boolean;
  allowEventReport: boolean;
  allowFind: boolean;
  allowFindWorklist: boolean;
  allowGet: boolean;
  allowMove: boolean;
  allowNAction: boolean;
  allowStore: boolean;
  allowTranscoding: boolean;
  host: string;
  localAet: string;
  manufacturer: string;
  port: number;
  timeout: number;
  useDicomTls: boolean;
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
  ModalitiesInStudy?: string;
  StudyDescription?: string;
  AccessionNumber?: string;
  StudyInstanceUID?: string;
};

type QuerySeries = {
  StudyUID?: string;
  Modality?: string;
  SeriesDescription?: string;
  SeriesNumber?: string;
  SeriesInstanceUID?: string;
  NumberOfSeriesRelatedInstances?: string;
  ProtocolName?: string;
};

type Level = "Series" | "Study";
export type QueryPayload = {
  Level: Level;
  Query: QueryStudy | QuerySeries;
};

export type FindPayload = QueryPayload & {
  Labels: string[];
  LabelsConstraint: string;
};

export type ExtendedQueryPayload = {
  queryPayload: QueryPayload;
  aet: string;
};

export type QueryResultSeries = QueryResult & {
  modality: string;
  seriesNumber: string;
  seriesDescription: string;
  numberOfSeriesRelatedInstances: number;
  seriesInstanceUID: string;
};

export type QueryResultStudy = QueryResult & {
  seriesInstanceUID: string;
  numberOfStudyRelatedInstances: number;
  numberOfStudyRelatedSeries: number;
  modalitiesInStudy: string;
};

type QueryResult = {
  answerId: string;
  answerNumber: number;
  level: Level;
  originAET: string;
  patientName: string;
  patientId: string;
  accessionNumber: string;
  studyDescription: string;
  studyDate: string;
  studyInstanceUID: string;
  requestedProcedureDescription: string;
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

export type Instances = {
  fileSize: number;
  fileUuid: string;
  id: string;
  indexInSeries: number;
  labels: string[];
  mainDicomTags: {
    acquisitionNumber: string | null;
    imageComments: string | null;
    imageOrientationPatient: string | null;
    imagePositionPatient: string | null;
    instanceCreationDate: string | null;
    instanceCreationTime: string | null;
    instanceNumber: string | null;
    sopInstanceUID: string | null;
    numberOfFrames: string | null;
  };
  parentSeries: string;
  type: string;
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

export type PatientModifyPayload = {
  replace: Partial<PatientMainDicomTags>;
  remove: string[];
  removePrivateTags: boolean;
  force: boolean;
  synchronous: boolean;
  keepSource: boolean;
  keep: string[];
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
  anonymizedFrom?: string;
};

export type AnonPatient = {
  newPatientName: string;
  newPatientId: string;
  originalPatient: Patient;
};

export type AnonStudy = {
  newPatientName: string;
  newPatientId: string;
  newStudyDescription: string;
  newAccessionNumber: string;
  originalStudy: Study;
};

export type RegionPixelData = {
  maskType: string,
  fillValue?: number,
  filterWidth?: number,
  regionType: string,
  origin: [number, number, number | undefined],
  end: [number, number, number | undefined],
}

export type StudyModifyPayload = {
  replace: Partial<StudyMainDicomTags & PatientMainDicomTags> & { raw: { [key: string]: string | number } };
  remove: string[];
  removePrivateTags: boolean;
  force: boolean;
  keep: string[];
  synchronous: boolean;
  keepSource: boolean;
  transcode: string;
  keepLabel: boolean;
};

export type SeriesModifyPayload = {
  replace: Partial<SeriesMainDicomTags> & { raw: { [key: string]: string | number } };
  remove: string[];
  removePrivateTags: boolean;
  keepSource: boolean;
  force: boolean;
  synchronous: boolean;
  keep: string[];
  transcode: string;
  maskPixelData: RegionPixelData[];
};

export type Queue = {
  progress: number;
  state: string;
  id: string;
  results: Record<string, any> | null;
  userId: number;
};

export type QueryQueue = Queue & {
  query: Record<string, any> | null;
};

export type Tag = {
  Name: string;
  Type: string;
  Value: string | Record<string, Tag>[];
};

export type Metadata = Record<string, Tag>;

export type AnonQueue = {
  progress: number;
  state: string;
  id: string;
  results: Study;
  userId: number;
};

export type AnonItem = {
  OrthancStudyID: string;
  Profile: "full" | "default";
  NewAccessionNumber: string;
  NewPatientID: string;
  NewPatientName: string;
};

export type AnonymizePayload = {
  Anonymizes: AnonItem[];
};

export type QueryQueueStudyItem = {
  patientName: string;
  patientId: string;
  studyDate: string;
  modality: string;
  studyDescription: string;
  accessionNumber: string;
  studyInstanceUID: string;
  aet: string;
};

export type QueryQueueSeriesItem = {
  studyInstanceUID: string;
  modality: string;
  protocolName: string;
  seriesDescription: string;
  seriesNumber: string;
  seriesInstanceUID: string;
  aet: string;
};

export type Rule = {
  DicomTag: string;
  ValueRepresentation: string;
  Value: string;
  Condition: string;
}

export type Destination = {
  Destination: string;
  Name: string;
}

export type Router = {
  RuleCondition: string;
  Rules: Rule[];
  Destinations: Destination[];
}

export type AutoRoutingItems = {
  Id: number;
  Name: string;
  EventType: string;
  Activated: boolean;
  Router: Router;
}

export type AutoRoutingPayload = {
  Name: string;
  EventType: string;
  Activated: boolean;
  Router: Router;
}