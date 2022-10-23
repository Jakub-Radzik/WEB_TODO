import express, { Express, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { betterSchema } from './graphQL'
import { mainDB, PORT } from './utils'
import cors from 'cors';

const app: Express = express()
const port = PORT

app.use( cors() );

app.use(
  '/graphql',
  graphqlHTTP({
    schema: betterSchema,
    graphiql: true,
  }),
)

app.get('/', (req: Request, res: Response) => {
  res.send('super + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

mainDB()
