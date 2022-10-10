const { connect } = require('mongoose');
const { MONGO_URI } = require('../config/config');
const { createModels, models } = require('./schema');

main().catch(err => console.log(err));

async function main() {
  console.log('Connecting to MongoDB...');
  await connect(MONGO_URI);
  createModels();
  console.log(`Connected to ${MONGO_URI}`);
}

// EXAMPLE USAGE:
//   const User = models.user;
// new User({username: "admin", password: "admin"}).save(function (err) {
// if (err) return handleError(err);
// // saved!
// });
