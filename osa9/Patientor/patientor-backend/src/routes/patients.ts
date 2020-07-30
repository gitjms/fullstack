/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
  // res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  let newPatient;
  if (query === '{}' && body === '{}' || req.query === undefined) {
    res.status(400).send('request undefined');
  } else {
    query !== '{}'
      ? newPatient = toNewPatient(req.query)
      : newPatient = toNewPatient(req.body);
    try {
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
});

export default router;