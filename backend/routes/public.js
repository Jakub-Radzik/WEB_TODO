var express = require('express');
var moment = require('moment');
var router = express.Router();
var { generateAccessToken } = require('../utils/JWT/jwt');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { schema } = require('../graphQL/schema/schema');

var root = {
  message: () => 'Hello World!'
};

router.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

router.use((req, res, next) => {
  console.log(`Time: ${moment(Date.now())}`);
  next();
});

router.get('/login', function (req, res, next) {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

router.get('/register', function (req, res, next) {
  res.send('respond with a resource');

});

module.exports = router;
