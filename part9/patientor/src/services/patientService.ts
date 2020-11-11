import patientsData from '../../patients.json';
import { Patients, newPatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patients[] => {
	return patientsData;
}

const getNoSensetivePatients = (): Omit<Patients, 'ssn'>[] => {
	return patientsData.map(({id, name, occupation, dateOfBirth, gender}) => {
		return {id, name, occupation, dateOfBirth, gender};
	})
}

const addPatient = (entry:newPatientEntry): Patients => {
	const newPatient:Patients = {
		id: uuidv4(),
		...entry
	}
	patientsData.push(newPatient);
	return newPatient;
}


export default {
	getPatients,
	getNoSensetivePatients,
	addPatient,
}
