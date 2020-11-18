export interface Diagnoses{
	code: string,
	name: string,
	latin?:string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{

}

export interface Patient{
	id: string,
	name: string,
	dateOfBirth: string,
	occupation: string,
	gender: string,
	ssn: string,
	entries: Entry[],
}

export interface newPatientEntry{
	name: string,
	dateOfBirth: string,
	occupation: string,
	gender: string,
	ssn: string,
}

export enum Gender {
	male = 'male',
	female = 'female',
	others = 'others'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >