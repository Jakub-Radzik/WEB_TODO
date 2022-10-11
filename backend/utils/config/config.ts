var dotenv = require('dotenv');
dotenv.config();

export const TOKEN_SECRET: string= process.env.TOKEN_SECRET || '2137';
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 2137;

