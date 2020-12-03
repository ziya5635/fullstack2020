import React from 'react';
import { Entry, Diagnosis, HealthCheckRating } from '../types';
import { Segment, Icon } from 'semantic-ui-react';
import {useStateValue} from '../state';

//const Heart: React.FC<{color: string}> = ({color}) => <Icon name='heart' color={color}/>

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnosis }] = useStateValue();
    const getDiagnosisName = (code:string): Diagnosis|undefined => diagnosis.find(item => item.code === code);
    const heartColor = (rate: HealthCheckRating): string => {
        switch (rate) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return ''
        }
    };
    //exhaustive type checking
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (entry.type) {
        case "HealthCheck":
            return (
                <Segment>
                    <h3>{entry.date} {<Icon name='doctor'/>} {entry.specialist}</h3>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes?.length ? entry.diagnosisCodes.map(item => <li key={item}>{item} {getDiagnosisName(item)?.name}</li>):null}
                    <Icon name='heart' className={heartColor(entry.healthCheckRating)}/>
                </Segment>
            )
        case "Hospital":
            return(
                <Segment>
                    <h3>{entry.date} {<Icon name='doctor'/>} {entry.specialist}</h3>
                    <p>{entry.description}</p>
                    <p>{entry.discharge.date} {entry.discharge.criteria}</p>
                </Segment>
            )
        case "OccupationalHealthcare":
            return(
                <Segment>
                    <h3>{entry.date} {<Icon name='doctor'/>} {entry.specialist}</h3>
                    <p>{entry.description}</p>
                    <p>{entry.employerName} start date:{entry.sickLeave?.startDate} end date: {entry.sickLeave?.endDate}</p>
                </Segment>
            )
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;