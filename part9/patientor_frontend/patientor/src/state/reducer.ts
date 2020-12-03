import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "FIND_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const find_patient = (patient:Patient): Action => {
  return {type: "FIND_PATIENT", payload: patient};
};

export const setPatientList = (patients: Patient[]): Action => {
  return {type: "SET_PATIENT_LIST", payload: patients};
}

export const addPatient = (patient: Patient): Action => {
  return {type: "ADD_PATIENT", payload: patient};
}

export const setDiagnosis = (diagnosis: Diagnosis[]): Action => {
  return {type: "SET_DIAGNOSIS", payload: diagnosis};
}

export const updatePatient = (patient: Patient): Action => {
  return {type: "UPDATE_PATIENT", payload: patient}
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FIND_PATIENT":
      return {
          ...state,
          selected: [...state.selected, action.payload]
        }
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload,
      }
    case "UPDATE_PATIENT":
      const id: string = action.payload.id;
      const updated: Patient[] = state.selected.filter((patient: Patient) => patient.id !== id);
      return {
        ...state,
        selected: [...updated, action.payload]
      }
    default:
      return state;
  }
};
