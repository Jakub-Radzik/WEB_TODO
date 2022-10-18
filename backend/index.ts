import express, { Express, Request, Response } from 'express'
import { PORT } from './utils/config/config'
import { graphqlHTTP } from 'express-graphql'
import { betterSchema } from './graphQL/schema/schema'
import { mainDB } from './utils/Mongo/connection'

const app: Express = express()
const port = PORT

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

mainDB();