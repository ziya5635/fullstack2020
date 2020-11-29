"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/:id/entries', (req, res) => {
    const id = req.params.id;
    const entries = patientService_1.default.getPatientEntry(id);
    res.send(entries);
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatient(id);
    res.send(patient);
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNoSensetivePatients());
});
router.post('/', (req, res) => {
    const { name, occupation, dateOfBirth, ssn, gender } = utils_1.default(req.body);
    const newPatient = patientService_1.default.addPatient({ name, occupation, dateOfBirth, ssn, gender });
    res.json(newPatient);
});
exports.default = router;
