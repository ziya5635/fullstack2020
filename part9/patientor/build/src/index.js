"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
