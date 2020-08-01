export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthCareEntry
  | HospitalEntry;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = DistributiveOmit<Entry, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn">;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;