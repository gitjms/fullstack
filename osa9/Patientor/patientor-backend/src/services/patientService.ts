import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import { v4 as uuid } from "uuid";

let savedPatients = [...patientData];
const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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
  const newPatient = {
    ...patient,
    id: uuid()
  };

  savedPatients = savedPatients.concat(newPatient);
  // patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatients,
  addPatient,
  findById
};