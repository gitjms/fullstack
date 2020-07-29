import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const diagnose = diagnoseService.findByCode(req.params.code);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { code, name, latin } = req.body as Diagnose;
  const newDiagnose = diagnoseService.addDiagnose({
    code,
    name,
    latin,
  });
  res.json(newDiagnose);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;