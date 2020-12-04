import React, {useEffect} from 'react';
import { Entry, OccupationalHealthcareEntry, Patient } from '../types';
import { useParams } from 'react-router-dom';
import {useStateValue} from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { find_patient, updatePatient } from '../state/reducer';
import EntryDetails from './EntryDetails';
import { Container } from 'semantic-ui-react';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddOccupationalForm from './AddOccupationalForm';
import { HealthCheckEntry } from '../types';

const PatientInfo: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [{ selected }, dispatch] = useStateValue();
    const per = selected.length ? selected.find(item => item.id === id) : null;
    useEffect(()=>{
        if(!per){
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
            .then(res => {
                dispatch(find_patient(res.data))
            })
            .catch(err => console.log(err.message));
        }
    }, [dispatch, id, per]);

    const submitNewHealthEntry = async (values: Omit<HealthCheckEntry, 'id'>) => {
        try {
            const entry: Omit<HealthCheckEntry, 'id'> = {
                ...values,
            }
            const res = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
            dispatch(updatePatient(res.data));
            return res.data;
        } catch (err) {
            console.error(err.message);
        }
    }

    const submitNewOccupationalEntry = async (values: Omit<OccupationalHealthcareEntry, 'id'>) => {
        try {
            const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
                ...values,
            }
            const res = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
            dispatch(updatePatient(res.data));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Container>
            <h2>{per?.name}</h2>
            <p>ssn: {per?.ssn}</p>
            <p>occupation: {per?.occupation}</p>
            {per?.entries.map(item => <EntryDetails entry={item} key={item.id}/>)}
            <AddHealthCheckForm onSubmit={submitNewHealthEntry}/>
            <AddOccupationalForm onSubmit={submitNewOccupationalEntry}/>
        </Container>
        
    )
}

export default PatientInfo