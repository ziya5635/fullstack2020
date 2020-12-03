import React, {useState} from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button, Modal } from "semantic-ui-react";
import { HealthCheckRating, HealthCheckEntry } from '../types';
import { TextField, NumberField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HealthCheckEntry, 'id' >; // | 'diagnosisCodes'


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    //onCancel: () => void;
  }


const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [{ diagnosis }] = useStateValue()
    const [error, setError] = React.useState<string | undefined>();

    return (
        <Modal onOpen={():void => setModalOpen(true)} onClose={():void => setModalOpen(false)} open={modalOpen} trigger={<Button>add entry</Button>}>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                <Formik
                initialValues={
                    {
                        description: '',
                        date: '',
                        specialist: '',
                        diagnosisCodes: [''],
                        healthCheckRating: 1,
                        type: 'HealthCheck',
                    }
                }
                onSubmit= {onSubmit}
                validate= {values => {
                    const requiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (!values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                    if (!values.type) {
                        errors.type = requiredError;
                    }
                    return errors;
                }}
                >
                {({isValid, dirty, setFieldValue, setFieldTouched}) => {
                    return(
                        <Form className='form ui'>
                            <Field
                            name='description'
                            label='Description'
                            placeHolder='Description'
                            component={TextField}
                            />
                            <Field
                            name='specialist'
                            label='Specialist'
                            placeHolder='Specialist'
                            component={TextField}
                            />
                            <Field
                            name='date'
                            label='Date'
                            placeHolder='Date'
                            component={TextField}
                            />
                            <Field 
                            name='helthCheckingRate'
                            label='healthCheckingRate'
                            min={0}
                            max={3}
                            component={NumberField}
                            />
                            <Field
                            name='type'
                            label='HealthCheck'
                            component={TextField}
                            />
                            <DiagnosisSelection diagnoses={Object.values(diagnosis)} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} />
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button type="button" onClick={():void => setModalOpen(false)} color="red">
                                    Cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                    >
                                    Add
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    );
                }}
                </Formik>
            </Modal.Content>

        </Modal>
    )

}

export default AddEntryForm;