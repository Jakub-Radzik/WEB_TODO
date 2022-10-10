var express = require('express');
const moment = require('moment');
var router = express.Router();

router.use((req, res, next) => {
  console.log(`Time: ${moment(Date.now())}`);
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/r1', (req, res, next) => {
  res.send('r1');
});

router.get('/r2', function (req, res, next) {
  res.send('r2');
});

router.all('/secret', (req, res, next) => {
  console.log('secret route');
  next();
});

router.get('/secret', (req, res, next) => {
  console.log('secret get');
  res.send('secret');
});

router.get('/:id/books/:bookId', (req, res, next) => {
  console.log('secret get');
  console.log(req.pa);
  res.send('secret');
});

let c = 0;
const closedHandler = (req, res, next) => {
  res.send(`${c++}`);
};

router.get(
  '/handlers',
  (req, res, next) => {
    console.log('first handler');
    next();
  },
  (req, res, next) => {
    console.log('second handler');
    res.send('git');
  }
);

router.get('/test', [closedHandler]);

router
  .route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

module.exports = router;
