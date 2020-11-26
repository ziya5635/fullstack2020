import React, {useEffect} from 'react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import {useStateValue} from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { find_patient } from '../state/reducer';

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

    return (
        <div>
            <h2>{per?.name}</h2>
            <p>ssn: {per?.ssn}</p>
            <p>occupation: {per?.occupation}</p>
            <div>
                <h3>{per?.entries.length? 'entries':null}</h3>
                <p>{per?.entries.length ? per?.entries[0].description:null}</p>
                <ul>
                    {per?.entries.length ? per?.entries[0].diagnosisCodes?.map(item => <li key={item}>{item}</li>):null}
                </ul>
            </div>
        </div>
    )
}
//https://fullstackopen.com/en/part9/react_with_types#exercises-9-16-9-18
export default PatientInfo