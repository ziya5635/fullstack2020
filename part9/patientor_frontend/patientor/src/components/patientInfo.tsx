import React, {useEffect} from 'react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import {useStateValue} from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const PatientInfo: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [{ selected }, dispatch] = useStateValue();
    const per = selected.length ? selected.find(item => item.id === id) : null;
    useEffect(()=>{
        if(!per){
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
            .then(res => {
                dispatch({type: "FIND_PATIENT", payload: res.data})
                console.log('fetched!');
            })
            .catch(err => console.log(err.message));
        }
    }, [dispatch, id, per]);
    
    return (
        <div>
            <h2>{per?.name}</h2>
            <p>ssn: {per?.ssn}</p>
            <p>occupation: {per?.occupation}</p>
        </div>
    )
}
//https://fullstackopen.com/en/part9/react_with_types#exercises-9-16-9-18
export default PatientInfo