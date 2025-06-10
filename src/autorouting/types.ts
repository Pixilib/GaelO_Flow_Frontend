export const eventOptions = [
  { value: 'NewInstance', label: 'New Instance' },
  { value: 'NewSeries', label: 'New Series' },
  { value: 'NewStudy', label: 'New Study' },
  { value: 'NewPatient', label: 'New Patient' },
  { value: 'StableSeries', label: 'Stable Series' },
  { value: 'StableStudy', label: 'Stable Study' },
  { value: 'StablePatient', label: 'Stable Patient' },
];

export const autoRoutingConditionOptions = [
  { value: 'AND', label: 'AND' },
  { value: 'OR', label: 'OR' },
];

export const autoRoutingRuleConditionOptions = [
  { value: "EQUALS", label: "EQUALS"},
  { value: "DIFFERENT", label: "DIFFERENT"},
  { value: "IN", label: "IN"}, // in array
  { value: "NOT_IN", label: "NOT IN"}, // not in array
  { value: "LESS_THAN", label: "LESS THAN"},
  { value: "GREATER_THAN", label: "GREATER THAN"},
]

export const autoRoutingRuleValueRepresentation = [
  {value: "string", label: "STRING"},
  {value: "number", label: "NUMBER"},
  {value: "date", label: "DATE"},
]

export const autoRoutingDestinationTypeOptions = [
  { value: "AET", label: "AET" },
  { value: "TMTVJob", label: "TMTVJob" },
  { value: "Peer", label: "PEER" },
]

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

export const autoRoutingRuleDicomTagOptions = [
  { value: AutoRoutingRuleDicomTag.PATIENT_NAME, label: "Patient Name" },
  { value: AutoRoutingRuleDicomTag.PATIENT_ID, label: "Patient ID" },
  { value: AutoRoutingRuleDicomTag.PATIENT_BIRTHDATE, label: "Patient Birthdate" },
  { value: AutoRoutingRuleDicomTag.PATIENT_SEX, label: "Patiend Sex" },
  { value: AutoRoutingRuleDicomTag.OTHER_PATIENT_IDS, label: "Other Patient IDs" },

  { value: AutoRoutingRuleDicomTag.STUDY_DATE, label: "Study Date" },
  { value: AutoRoutingRuleDicomTag.STUDY_TIME, label: "Study Time" },
  { value: AutoRoutingRuleDicomTag.STUDY_ID, label: "Study ID" },
  { value: AutoRoutingRuleDicomTag.STUDY_DESCRIPTION, label: "Study Description" },
  { value: AutoRoutingRuleDicomTag.ACCESSION_NUMBER, label: "Accession Number" },
  { value: AutoRoutingRuleDicomTag.STUDY_INSTANCE_UID, label: "Study Instance UID" },
  { value: AutoRoutingRuleDicomTag.REQUESTED_PROCEDURE_DESCRIPTION, label: "Requested Procedure Description" },
  { value: AutoRoutingRuleDicomTag.INSTITUTION_NAME, label: "Institution Name" },
  { value: AutoRoutingRuleDicomTag.REQUESTING_PHYSICIAN, label: "Requesting Physician" },
  { value: AutoRoutingRuleDicomTag.REFERRING_PHYSICIAN_NAME, label: "Referring Physician Name" },

  { value: AutoRoutingRuleDicomTag.SERIES_DATE, label: "Series Date" },
  { value: AutoRoutingRuleDicomTag.SERIES_TIME, label: "Series Time" },
  { value: AutoRoutingRuleDicomTag.MODALITY, label: "Modality" },
  { value: AutoRoutingRuleDicomTag.MANUFACTURER, label: "Manufacturer" },
  { value: AutoRoutingRuleDicomTag.STATION_NAME, label: "Station Name" },
  { value: AutoRoutingRuleDicomTag.SERIES_DESCRIPTION, label: "Series Description" },
  { value: AutoRoutingRuleDicomTag.BODY_PART_EXAMINED, label: "Body Part Examined" },
  { value: AutoRoutingRuleDicomTag.SEQUENCE_NAME, label: "Sequence Name" },
  { value: AutoRoutingRuleDicomTag.PROTOCOL_NAME, label: "Protocol Name" },
  { value: AutoRoutingRuleDicomTag.SERIES_NUMBER, label: "Series Number" },
  { value: AutoRoutingRuleDicomTag.CARDIAC_NUMBER_OF_IMAGES, label: "Cardiac Number Of Images" },
  { value: AutoRoutingRuleDicomTag.IMAGES_IN_ACQUISITION, label: "Images In Acquisition" },
  { value: AutoRoutingRuleDicomTag.NUMBER_OF_TEMPORAL_POSITIONS, label: "Number Of Temporal Positions" },
  { value: AutoRoutingRuleDicomTag.NUMBER_OF_SLICES, label: "Number Of Slices" },
  { value: AutoRoutingRuleDicomTag.NUMBER_OF_TIME_SLICES, label: "Number Of Time Slices" },
  { value: AutoRoutingRuleDicomTag.SERIES_INSTANCE_UID, label: "Series Instance UID" },
  { value: AutoRoutingRuleDicomTag.IMAGE_ORIENTATION_PATIENT, label: "Image Orientation Patient" },
  { value: AutoRoutingRuleDicomTag.SERIES_TYPE, label: "Series Type" },
  { value: AutoRoutingRuleDicomTag.OPERATORS_NAME, label: "Operators Name" },
  { value: AutoRoutingRuleDicomTag.PERFORMED_PROCEDURE_STEP_DESCRIPTION, label: "Performed Procedure Step Description" },
  { value: AutoRoutingRuleDicomTag.ACQUISITION_DEVICE_PROCESSING_DESCRIPTION, label: "Acquisition Device Processing Description" },
  { value: AutoRoutingRuleDicomTag.CONTRAST_BOLUS_AGENT, label: "Contrast Bolus Agent" },

  { value: AutoRoutingRuleDicomTag.INSTANCE_CREATION_DATE, label: "Instance Creation Date" },
  { value: AutoRoutingRuleDicomTag.INSTANCE_CREATION_TIME, label: "Instance Creation Time" },
  { value: AutoRoutingRuleDicomTag.ACQUISITION_NUMBER, label: "Acquisition Number" },
  { value: AutoRoutingRuleDicomTag.IMAGE_INDEX, label: "Image Index" },
  { value: AutoRoutingRuleDicomTag.INSTANCE_NUMBER, label: "Instance Number" },
  { value: AutoRoutingRuleDicomTag.NUMBER_OF_FRAMES, label: "Number Of Frames" },
  { value: AutoRoutingRuleDicomTag.TEMPORAL_POSITION_IDENTIFIER, label: "Temporal Position Identifier" },
  { value: AutoRoutingRuleDicomTag.SOP_INSTANCE_UID, label: "SOP Instance UID" },
  { value: AutoRoutingRuleDicomTag.IMAGE_POSITION_PATIENT, label: "Image Position Patient" },
  { value: AutoRoutingRuleDicomTag.IMAGE_COMMENTS, label: "Image Comments" },
]
