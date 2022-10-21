import express, { Express, Request, Response } from 'express'
const router = express.Router()
import { authenticateToken } from '../utils/JWT/jwt'

// JWT
router.use('/', (req: Request, res: Response, next) => {
  console.log("request")
  authenticateToken(req, res, next),
}
)

router.get('/intro', function (req: Request, res: Response) {
  res.send(`Welcome to intro`)
})

export default router
