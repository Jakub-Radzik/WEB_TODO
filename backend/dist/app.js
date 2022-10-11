"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config/config");
const app = (0, express_1.default)();
const port = config_1.PORT;
// app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Expresssssssss + TypeScript Server');
});
app.get('/intro', function (req, res) {
    res.send(`Welcome to intro`);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
