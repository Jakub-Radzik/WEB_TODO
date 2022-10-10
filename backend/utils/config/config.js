var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
