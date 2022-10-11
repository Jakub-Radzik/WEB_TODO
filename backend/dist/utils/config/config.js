"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_URI = exports.TOKEN_SECRET = void 0;
var dotenv = require('dotenv');
dotenv.config();
exports.TOKEN_SECRET = process.env.TOKEN_SECRET || '2137';
exports.MONGO_URI = process.env.MONGO_URI;
exports.PORT = process.env.PORT || 2137;
