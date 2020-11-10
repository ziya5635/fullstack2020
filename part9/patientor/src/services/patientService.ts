import patientsData from '../../patients.json';
import { Patients } from '../types';



const getPatients = (): Patients[] => {
	return patientsData;
}

const getNoSensetivePatients = (): Omit<Patients, 'ssn'>[] => {
	return patientsData.map(({id, name, occupation, dateOfBirth, gender}) => {
		return {id, name, occupation, dateOfBirth, gender};
	})
}


export default {
	getPatients,
	getNoSensetivePatients
}
