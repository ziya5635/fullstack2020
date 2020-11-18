"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../patients.json"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_json_1.default;
};
const getNoSensetivePatients = () => {
    return patients_json_1.default.map(({ id, name, occupation, dateOfBirth, gender }) => {
        return { id, name, occupation, dateOfBirth, gender };
    });
};
const addPatient = (entry) => {
    const instance = {};
    const ent = [instance];
    const newPatient = Object.assign({ entries: ent, id: uuid_1.v4() }, entry);
    const pData = patients_json_1.default;
    pData.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    return patients_json_1.default.find(p => p.id === id);
};
exports.default = {
    getPatients,
    getPatient,
    getNoSensetivePatients,
    addPatient,
};
