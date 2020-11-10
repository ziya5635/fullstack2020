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