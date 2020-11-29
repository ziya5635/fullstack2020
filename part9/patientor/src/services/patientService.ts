//import patientsData from '../../patients.json';
import  patientsData from '../../patients'
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

const addPatient = (entry:newPatientEntry): Omit<Patient, 'entries'> => {
	//const instance : Entry = {};
	//const ent : Array<Entry> = [instance];
	const newPatient = {
		entries: [],
		id: uuidv4(),
		...entry
	}
	const pData: Omit<Patient, 'entries'>[] = patientsData;
	pData.push(newPatient);
	return newPatient;
}

const getPatient = (id:string): Patient|undefined => {
	return patientsData.find(p => p.id === id);
}

const getPatientEntry = (id:string): Entry[]|[] => {
	for (let index = 0; index < patientsData.length; index++) {
		if (id===patientsData[index].id) {
			return patientsData[index].entries;
		}
	}
	return [];
}


export default {
	getPatients,
	getPatient,
	getNoSensetivePatients,
	addPatient,
	getPatientEntry,
}
