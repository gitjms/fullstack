/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Error: patient not found');
  }
});

router.post('/', (req, res) => {
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  let newPatient;
  if (query === '{}' && body === '{}' || req.query === undefined) {
    res.status(400).send('Error: request undefined');
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

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);

  let newEntry;
  if (query === '{}' && body === '{}' || req.query === undefined) {
    res.status(400).send('Error: request undefined');
  } else if (!patient) {
    res.status(404).send('Error: patient not found');
  } else {
    query !== '{}'
      ? newEntry = toNewEntry(req.query)
      : newEntry = toNewEntry(req.body);
    try {
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
});

export default router;