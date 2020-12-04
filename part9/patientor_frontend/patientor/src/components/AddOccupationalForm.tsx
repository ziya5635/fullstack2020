import React, {useState} from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button, Modal } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from '../types';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from '../state';
import * as Yup from 'yup';


export type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    //onCancel: () => void;
  }

  const entrySchema = Yup.object().shape({
    description: Yup.string().min(3, 'too short value.').required('Description is required and it should be at least 1 char.'),
    date: Yup.date().required('Date is required.'),
    specialist: Yup.string().min(2, 'too short value.').required('Specialist is required and it should be at least 2 chars'),
    type: Yup.string().matches(/(OccupationalHealthcare)/).required('required'),
    employerName: Yup.string().min(0, 'too short value.').required('at least 2 chars required.'),
    sickLeave: Yup.object().shape({
        startDate: Yup.date().required('Date is required.'),
        endDate: Yup.date().required('Date is required.')
    }),
});

const AddOccupationalForm: React.FC<Props>=({onSubmit}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [{ diagnosis }] = useStateValue();

    return (
        <Modal onOpen={():void => setModalOpen(true)} onClose={():void => setModalOpen(false)} open={modalOpen} trigger={<Button>add occupational entry</Button>}>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                <Formik
                initialValues={
                    {
                        description: '',
                        date: '',
                        specialist: '',
                        employerName: '',
                        sickLeave: {startDate: '', endDate: ''},
                        diagnosisCodes: [''],
                        type: 'OccupationalHealthcare',
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
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (!values.sickLeave?.startDate) {
                        errors.startDate = requiredError;
                    }
                    if (!values.sickLeave?.endDate) {
                        errors.endDate = requiredError;
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
                            name='employerName'
                            label='EmployerName'
                            placeHolder='EmployerName'
                            component={TextField}
                            />
                            {errors.employerName && touched.employerName ? (<div>{errors.employerName}</div>) : null}
                            <DiagnosisSelection diagnoses={Object.values(diagnosis)} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} />
                            <Field
                            name='sickLeave.startDate'
                            label='SickLeaveStartDate'
                            placeHolder='SickLeaveStartDate'
                            component={TextField}
                            />
                            <Field
                            name='sickLeave.endDate'
                            label='SickLeaveEndDate'
                            placeHolder='SickLeaveEndDate'
                            component={TextField}
                            />
                            <Field
                            name='type'
                            label='OccupationalHealthcare'
                            placeHolder='OccupationalHealthcare'
                            component={TextField}
                            />
                            {errors.type && touched.type ? (<div>{errors.type}</div>) : null}
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

export default AddOccupationalForm;

/*
                            <Field
                            name='OccupationalHealthcare'
                            label='OccupationalHealthcare'
                            component={TextField}
                            />
                            {errors.type && touched.type ? (<div>{errors.type}</div>) : null}
*/