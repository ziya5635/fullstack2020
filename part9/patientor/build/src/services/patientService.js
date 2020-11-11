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
    const newPatient = Object.assign({ id: uuid_1.v4() }, entry);
    patients_json_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getNoSensetivePatients,
    addPatient,
};
