import React, {useEffect} from 'react';
import { Entry, Patient } from '../types';
import { useParams } from 'react-router-dom';
import {useStateValue} from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { find_patient, updatePatient } from '../state/reducer';
import EntryDetails from './EntryDetails';
import { Container } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
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

    const submitNewEntry = async (values: Omit<HealthCheckEntry, 'id'>) => {
        try {console.log('in submit')
            const entry: Omit<HealthCheckEntry, 'id'> = {
                ...values,
            }
            const res = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
            dispatch(updatePatient(res.data))
            return res.data;
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
            <AddEntryForm onSubmit={submitNewEntry}/>
        </Container>
        
    )
}
//https://fullstackopen.com/en/part9/react_with_types#exercises-9-16-9-18
export default PatientInfo