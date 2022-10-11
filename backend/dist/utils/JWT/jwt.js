"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateAccessToken = (username) => {
    return jsonwebtoken_1.default.sign(username, config_1.TOKEN_SECRET, { expiresIn: '7d' });
};
exports.generateAccessToken = generateAccessToken;
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        // req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
