"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../patients.json"));
const getPatients = () => {
    return patients_json_1.default;
};
const getNoSensetivePatients = () => {
    return patients_json_1.default.map(({ id, name, occupation, dateOfBirth, gender }) => {
        return { id, name, occupation, dateOfBirth, gender };
    });
};
exports.default = {
    getPatients,
    getNoSensetivePatients
};
