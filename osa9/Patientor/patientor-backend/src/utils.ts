/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseToString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${String(param) || ""}`);
  }

  return param;
};

const parseToDate = (param: any, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
      throw new Error(`Incorrect or missing ${paramName}: ${String(param) || ""}`);
  }
  return param;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + String(gender));
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseToString(object.name, "name"),
    dateOfBirth: parseToDate(object.dateOfBirth, "date of birth"),
    ssn: parseToString(object.ssn, "social security number"),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, "occupation")
  };
};

export default toNewPatient;