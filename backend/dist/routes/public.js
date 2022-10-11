"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log(`Time: ${(0, moment_1.default)(Date.now())}`);
    next();
});
// router.get('/login', function (req, res, next) {
//   const token = generateAccessToken({ username: req.body.username });
//   res.json(token);
// });
router.get('/register', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
