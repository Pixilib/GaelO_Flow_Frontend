export enum AutoroutingEventType {
  NEW_INSTANCE = "NewInstance",
  NEW_SERIES = "NewSeries",
  NEW_STUDY = "NewStudy",
  NEW_PATIENT = "NewPatient",
  STABLE_SERIES = "StableSeries",
  STABLE_STUDY = "StableStudy",
  STABLE_PATIENT = "StablePatient",
}

export enum AutoRoutingCondition {
  AND = "AND",
  OR = "OR",
}

export enum AutoRoutingRuleCondition {
  EQUALS = "EQUALS",
  DIFFERENT = "DIFFERENT",
  IN = "IN", // in array
  NOT_IN = "NOT_IN", // not in array
  LESS_THAN = "LESS_THAN",
  GREATER_THAN = "GREATER_THAN",
}

export enum AutoRoutingRuleValueRepresentation {
  STRING = "string",
  NUMBER = "number",
  DATE = "date",
}

export enum AutoRoutingDestinationType {
  AET = "AET",
  TMTVJOB = "TMTVJob",
  PEER = "Peer",
}

export enum AutoRoutingRuleDicomTag {
  PATIENT_NAME = "PatientName",
  PATIENT_ID = "PatientID",
  PATIENT_BIRTHDATE = "PatientBirthDate",
  PATIENT_SEX = "PatientSex",
  OTHER_PATIENT_IDS = "OtherPatientIDs",

  STUDY_DATE = "StudyDate",
  STUDY_TIME = "StudyTime",
  STUDY_ID = "StudyID",
  STUDY_DESCRIPTION = "StudyDescription",
  ACCESSION_NUMBER = "AccessionNumber",
  STUDY_INSTANCE_UID = "StudyInstanceUID",
  REQUESTED_PROCEDURE_DESCRIPTION = "RequestedProcedureDescription",
  INSTITUTION_NAME = "InstitutionName",
  REQUESTING_PHYSICIAN = "RequestingPhysician",
  REFERRING_PHYSICIAN_NAME = "ReferringPhysicianName",

  SERIES_DATE = "SeriesDate",
  SERIES_TIME = "SeriesTime",
  MODALITY = "Modality",
  MANUFACTURER = "Manufacturer",
  STATION_NAME = "StationName",
  SERIES_DESCRIPTION = "SeriesDescription",
  BODY_PART_EXAMINED = "BodyPartExamined",
  SEQUENCE_NAME = "SequenceName",
  PROTOCOL_NAME = "ProtocolName",
  SERIES_NUMBER = "SeriesNumber",
  CARDIAC_NUMBER_OF_IMAGES = "CardiacNumberOfImages",
  IMAGES_IN_ACQUISITION = "ImagesInAcquisition",
  NUMBER_OF_TEMPORAL_POSITIONS = "NumberOfTemporalPositions",
  NUMBER_OF_SLICES = "NumberOfSlices",
  NUMBER_OF_TIME_SLICES = "NumberOfTimeSlices",
  SERIES_INSTANCE_UID = "SeriesInstanceUID",
  IMAGE_ORIENTATION_PATIENT = "ImageOrientationPatient",
  SERIES_TYPE = "SeriesType",
  OPERATORS_NAME = "OperatorsName",
  PERFORMED_PROCEDURE_STEP_DESCRIPTION = "PerformedProcedureStepDescription",
  ACQUISITION_DEVICE_PROCESSING_DESCRIPTION = "AcquisitionDeviceProcessingDescription",
  CONTRAST_BOLUS_AGENT = "ContrastBolusAgent",

  INSTANCE_CREATION_DATE = "InstanceCreationDate",
  INSTANCE_CREATION_TIME = "InstanceCreationTime",
  ACQUISITION_NUMBER = "AcquisitionNumber",
  IMAGE_INDEX = "ImageIndex",
  INSTANCE_NUMBER = "InstanceNumber",
  NUMBER_OF_FRAMES = "NumberOfFrames",
  TEMPORAL_POSITION_IDENTIFIER = "TemporalPositionIdentifier",
  SOP_INSTANCE_UID = "SOPInstanceUID",
  IMAGE_POSITION_PATIENT = "ImagePositionPatient",
  IMAGE_COMMENTS = "ImageComments",
}


export type AutoRoutingRule = {
  DicomTag: AutoRoutingRuleDicomTag;
  ValueRepresentation: AutoRoutingRuleValueRepresentation;
  Value: string | number;
  Condition: AutoRoutingRuleCondition;
};

export type DestinationRule = {
  Destination: AutoRoutingDestinationType;
  Name: string
}

export type Router = {
  RuleCondition: AutoRoutingCondition;
  Rules: AutoRoutingRule[];
  Detinations: DestinationRule[]
}

export type AutoRouter = {
  Name: string;
  EventType: AutoroutingEventType;
  IsActivated: boolean;
  Router: Router;
}
