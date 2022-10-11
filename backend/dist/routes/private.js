"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jwt_1 = require("../utils/JWT/jwt");
// JWT
router.use('/', (req, res, next) => (0, jwt_1.authenticateToken)(req, res, next));
router.get('/intro', function (req, res) {
    res.send(`Welcome to intro`);
});
exports.default = router;
