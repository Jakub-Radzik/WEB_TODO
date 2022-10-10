var express = require('express');
var router = express.Router();
var jwt = require('../utils/JWT/jwt');

// JWT
router.use('/', (req, res, next) => jwt.authenticateToken(req, res, next));

router.get('/intro', function (req, res, next) {
  res.send(`Welcome to intro ${req.user.username}`);
});

module.exports = router;
