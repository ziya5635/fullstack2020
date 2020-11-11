"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parseName = (name) => {
    if (!name || typeof name !== 'string') {
        throw new Error('not valid name given.');
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || typeof date !== 'string' || !isDate) {
        throw new Error('not valid date given.');
    }
    return date;
};
const parseOccupation = (occupation) => {
    if (!occupation || typeof occupation !== 'string') {
        throw new Error('not valid occupation given');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || typeof ssn !== 'string') {
        throw new Error('not valid ssn given.');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender) {
        throw new Error('not valid gender.');
    }
    return gender;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object) => {
    const patient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn)
    };
    return patient;
};
exports.default = toNewPatient;
