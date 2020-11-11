import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import {newPatientEntry} from '../types';


const router = express.Router();


router.get('/', (_req, res) => {
	res.send(patientService.getNoSensetivePatients());
});

router.post('/', (req, res) => {
	const {name, occupation, dateOfBirth, ssn, gender} : newPatientEntry = toNewPatient(req.body)
	const newPatient = patientService.addPatient({name, occupation, dateOfBirth, ssn, gender})
	res.json(newPatient)
})

export default router;