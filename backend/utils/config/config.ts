var dotenv = require('dotenv')
dotenv.config()

export const TOKEN_SECRET: string = process.env.TOKEN_SECRET || '2137'
export const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.PORT || 2137
export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET
export const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:3000/gauth'

export const GOOGLE_CONFIG = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirect: REDIRECT_URL,
};

console.log(GOOGLE_CONFIG)
