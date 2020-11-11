import {newPatientEntry, Gender} from './types';

const parseName = (name:any):string => {
	if(!name || typeof name !== 'string'){
		throw new Error('not valid name given.');
	}
	return name;
};

const isDate = (date: string):boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date:any):string => {
	if(!date || typeof date !== 'string' || !isDate){
		throw new Error('not valid date given.');
	}return date;
};

const parseOccupation = (occupation:any):string => {
	if(!occupation || typeof occupation !== 'string'){
		throw new Error('not valid occupation given');
	}return occupation;
};

const parseSsn = (ssn:any):string => {
	if(!ssn || typeof ssn !== 'string'){
		throw new Error('not valid ssn given.');
	}return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender:any):Gender => {
	if(!gender || !isGender){
		throw new Error('not valid gender.');
	}return gender;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object:any):newPatientEntry => {
	const patient:newPatientEntry = {
		name: parseName(object.name),
		dateOfBirth: parseDate(object.dateOfBirth),
		occupation: parseOccupation(object.occupation),
		gender: parseGender(object.gender),
		ssn: parseSsn(object.ssn)
	};
	return patient;
};

export default toNewPatient;
