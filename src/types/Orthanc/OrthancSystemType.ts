

export type TopLevel = {
    ApiVersion:               number;
    CheckRevisions:           boolean;
    DatabaseBackendPlugin:    null;
    DatabaseServerIdentifier: string;
    DatabaseVersion:          number;
    DicomAet:                 string;
    DicomPort:                number;
    HasLabels:                boolean;
    HttpPort:                 number;
    IngestTranscoding:        string;
    IsHttpServerSecure:       boolean;
    MainDicomTags:            MainDicomTags;
    MaximumStorageMode:       string;
    MaximumStorageSize:       number;
    Name:                     string;
    OverwriteInstances:       boolean;
    PluginsEnabled:           boolean;
    StorageAreaPlugin:        null;
    StorageCompression:       boolean;
    UserMetadata:             UserMetadata;
    Version:                  string;
}

export type MainDicomTags = {
    Instance: string;
    Patient:  string;
    Series:   string;
    Study:    string;
}

//?define the UserMetadata interface
//!WIP
export interface UserMetadata {
}
