import express, { Express, Request, Response } from 'express';
import { PORT } from './utils/config/config';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphQL/schema/schema';

const app: Express = express();
const port = PORT;

// const expressGraphQL = require('express-graphql').graphqlHTTP;

var root = {
  message: 'Hello World!',
  what: 'eo',
  roll: [1,2,3]
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));



app.get('/', (req: Request, res: Response) => {
  res.send('super + TypeScript Server');
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});