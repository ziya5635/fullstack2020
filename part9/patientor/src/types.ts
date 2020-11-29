export interface Diagnoses{
	code: string,
	name: string,
	latin?:string
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
	Male = 'male',
	Female = 'female',
	Others = 'others'
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: string[];
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
  }
  
export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
  }

export  interface HospitalEntry extends BaseEntry {
	type: 'Hospital',
	description: string,
	discharge: {
		  date: string,
		  criteria: string
	  }
  }

 export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare',
	description: string,
	employerName: string,
	sickLeave?: {
		startDate: string,
		endDate: string
	}
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
  //|{};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >