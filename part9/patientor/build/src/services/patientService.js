"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import patientsData from '../../patients.json';
const patients_1 = __importDefault(require("../../patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNoSensetivePatients = () => {
    return patients_1.default.map(({ id, name, occupation, dateOfBirth, gender }) => {
        return { id, name, occupation, dateOfBirth, gender };
    });
};
const addPatient = (entry) => {
    //const instance : Entry = {};
    //const ent : Array<Entry> = [instance];
    const newPatient = Object.assign({ entries: [], id: uuid_1.v4() }, entry);
    console.log(newPatient);
    const pData = patients_1.default; //Omit<Patient, 'entries'>[]      //type changed.
    pData.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    return patients_1.default.find(p => p.id === id);
};
const getPatientEntry = (id) => {
    for (let index = 0; index < patients_1.default.length; index++) {
        if (id === patients_1.default[index].id) {
            return patients_1.default[index].entries;
        }
    }
    return [];
};
const putPatientEntry = (entry, id) => {
    const new_entry = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
    const pData = patients_1.default;
    const patient = pData.find(item => item.id === id);
    if (patient) {
        patient.entries = patient.entries.concat(new_entry);
        return patient;
    }
    else {
        return undefined;
    }
};
exports.default = {
    getPatients,
    getPatient,
    getNoSensetivePatients,
    addPatient,
    getPatientEntry,
    putPatientEntry,
};
