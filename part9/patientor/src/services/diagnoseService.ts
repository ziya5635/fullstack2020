import diagnosesData from '../../diagnoses.json';
import { Diagnoses } from '../types';


const getDiagnoses = (): Diagnoses[] => {
	return diagnosesData;
}


export default {
	getDiagnoses
}