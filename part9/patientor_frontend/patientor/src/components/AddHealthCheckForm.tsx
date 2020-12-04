import React, {useState} from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button, Modal } from "semantic-ui-react";
import { HealthCheckEntry } from '../types';
import { TextField, NumberField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from '../state';
import * as Yup from 'yup';

export type EntryFormValues = Omit<HealthCheckEntry, 'id' >


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    //onCancel: () => void;
  }

const entrySchema = Yup.object().shape({
    description: Yup.string().min(3, 'too short value.').required('Description is required and it should be at least 1 char.'),
    date: Yup.date().required('Date is required and it should be at least 10 chars.'),
    specialist: Yup.string().min(2, 'too short value.').required('Specialist is required and it should be at least 2 chars'),
    type: Yup.string().matches(/(HealthCheck)/).required('required'),
    healthCheckRating: Yup.number().min(0, 'not in valid range').max(3, 'not in valid range').required('requires a number between 0 and 3')
})

const AddHealthCheckForm: React.FC<Props> = ({ onSubmit }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [{ diagnosis }] = useStateValue();

    return (
        <Modal onOpen={():void => setModalOpen(true)} onClose={():void => setModalOpen(false)} open={modalOpen} trigger={<Button>add health check entry</Button>}>
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
                validationSchema= {entrySchema}
                onSubmit= {onSubmit}
                validate= {values => {
                    const requiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (!values.type) {
                        errors.type = requiredError;
                    }
                    return errors;
                }}
                >
                {({isValid, dirty, setFieldValue, setFieldTouched, errors, touched}) => {
                    return(
                        <Form className='form ui'>
                            <Field
                            name='description'
                            label='Description'
                            placeHolder='Description'
                            component={TextField}
                            />
                            {errors.description && touched.description ? (<div>{errors.description}</div>) : null}
                            <Field
                            name='specialist'
                            label='Specialist'
                            placeHolder='Specialist'
                            component={TextField}
                            />
                            {errors.specialist && touched.specialist ? (<div>{errors.specialist}</div>) : null}
                            <Field
                            name='date'
                            label='Date'
                            placeHolder='Date'
                            component={TextField}
                            />
                            {errors.date && touched.date ? (<div>{errors.date}</div>) : null}
                            {}
                            <Field 
                            name='healthCheckRating'
                            label='healthCheckRating'
                            min={0}
                            max={3}
                            component={NumberField}
                            />
                            {errors.healthCheckRating && touched.healthCheckRating ? (<div>{errors.healthCheckRating}</div>) : null}
                            <Field
                            name='type'
                            label='HealthCheck'
                            component={TextField}
                            />
                            {errors.type && touched.type ? (<div>{errors.type}</div>) : null}
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

export default AddHealthCheckForm;