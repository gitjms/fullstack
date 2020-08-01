import patientData from '../../data/patients';
import { PublicPatient, Patient, NewPatient, Entry, NewEntry } from '../types';
import { v4 as uuid } from "uuid";

let savedPatients = [...patientData];
const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] as Entry[] };

  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: uuid() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };

  savedPatients = savedPatients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p
  );

  return savedPatient;
};

export default {
  getPublicPatients,
  getPatients,
  addPatient,
  addEntry,
  findById
};