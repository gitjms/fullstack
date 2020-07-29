import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const findByCode = (code: string): Diagnose | undefined => {
  const entry = diagnoses.find(d => d.code === code);
  return entry;
};

// const getEntries = (): Diagnose[] => {
//   return diagnoses.map(({ code, name, latin }) => ({
//     code,
//     name,
//     latin
//   }));
// };

const addDiagnose = (entry: Diagnose): Diagnose => {
  const newDiagnose = {
    ...entry
  };

  diagnoses.push(newDiagnose);
  return newDiagnose;
};

export default {
  // getNonSensitiveEntries,
  getDiagnoses,
  addDiagnose,
  findByCode
};