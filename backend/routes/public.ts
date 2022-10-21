import express, { Express, Request, Response } from 'express'
import moment from 'moment'
const router = express.Router()

router.use((req, res, next) => {
  console.log(`Time: ${moment(Date.now())}`)
  next()
})

// router.get('/login', function (req, res, next) {
//   const token = generateAccessToken({ username: req.body.username });
//   res.json(token);
// });

router.get('/register', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
