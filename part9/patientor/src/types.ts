export interface Diagnoses{
	code: string,
	name: string,
	latin?:string
}

export interface Patients{
	id: string,
	name: string,
	dateOfBirth: string,
	occupation: string,
	gender: string,
	ssn: string
}

export interface newPatientEntry{
	name: string,
	dateOfBirth: string,
	occupation: string,
	gender: string,
	ssn: string
}

export enum Gender {
	male = 'male',
	female = 'female',
	others = 'others'
}