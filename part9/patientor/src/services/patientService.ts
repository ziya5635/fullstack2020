import patientsData from '../../patients.json';
import { Patient, newPatientEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patient[] => {
	return patientsData;
}

const getNoSensetivePatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
	return patientsData.map(({id, name, occupation, dateOfBirth, gender}) => {
		return {id, name, occupation, dateOfBirth, gender};
	})
}

const addPatient = (entry:newPatientEntry): Patient => {
	const instance : Entry = {};
	const ent : Array<Entry> = [instance];
	const newPatient:Patient = {
		entries: ent,
		id: uuidv4(),
		...entry
	}
	const pData:Patient[] = patientsData;
	pData.push(newPatient);
	return newPatient;
}

const getPatient = (id:string): Patient|undefined => {
	return patientsData.find(p => p.id === id);
}


export default {
	getPatients,
	getPatient,
	getNoSensetivePatients,
	addPatient,
}
