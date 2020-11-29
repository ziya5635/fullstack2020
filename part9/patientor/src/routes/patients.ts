import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import {newPatientEntry} from '../types';


const router = express.Router();

router.get('/:id/entries', (req, res) => {
	const id:string = req.params.id;
	const entries = patientService.getPatientEntry(id);
	res.send(entries);
})

router.get('/:id', (req, res) => {
	const id:string = req.params.id;
	const patient = patientService.getPatient(id);
	res.send(patient);
});

router.get('/', (_req, res) => {
	res.send(patientService.getNoSensetivePatients());
});

router.post('/', (req, res) => {
	const {name, occupation, dateOfBirth, ssn, gender} : newPatientEntry = toNewPatient(req.body)
	const newPatient = patientService.addPatient({name, occupation, dateOfBirth, ssn, gender})
	res.json(newPatient)
})



export default router;