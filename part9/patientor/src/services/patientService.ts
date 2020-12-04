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
	console.log(newPatient)
	const pData:Patient[] = patientsData; //Omit<Patient, 'entries'>[]      //type changed.
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

const putPatientEntry = (entry: Entry, id:string): Patient|undefined => {
	const new_entry:Entry = {
		...entry,
		id: uuidv4(),
	}
	const pData:Patient[] = patientsData;
	const patient = pData.find(item => item.id === id);
	if (patient) {
		patient.entries = patient.entries.concat(new_entry);
		return patient;
	}else{
		return undefined;
	}
	
}


export default {
	getPatients,
	getPatient,
	getNoSensetivePatients,
	addPatient,
	getPatientEntry,
	putPatientEntry,
}
