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
  try {
    const newPatient = toNewPatient(req.body);
    // res.json(req.body);
    // const { name, dateOfBirth, ssn, gender, occupation } = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
    // res.status(400).json({ error: e.message });
  }
});

export default router;