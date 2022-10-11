import express, { Express, Request, Response } from 'express';
import { PORT } from './utils/config/config';
import { graphqlHTTP } from 'express-graphql';
import { betterSchema, schema } from './graphQL/schema/schema';
import { getTask, getUserTasks } from './resolvers/tasks';

const app: Express = express();
const port = PORT;


var root = {
  message: 'Hello World!',
  what: 'eo',
  roll: [1,2,3],
  getTask: getTask,
  getUserTasks: getUserTasks
};

app.use('/graphql', graphqlHTTP({
  schema: betterSchema,
  rootValue: root,
  graphiql: true
}));

app.get('/', (req: Request, res: Response) => {
  res.send('super + TypeScript Server');
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});