export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
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
	//description: string,
	discharge: {
		  date: string,
		  criteria: string
	  }
  }

 export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare',
	//description: string,
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

export enum color {
	'green'= 0,
	'yellow'=1,
	'orange'=2,
	'red'=3,
}