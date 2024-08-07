import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientRouter.get('/:patientId', (req, res) => {
  res.send(patientsService.getOne(req.params.patientId));
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;