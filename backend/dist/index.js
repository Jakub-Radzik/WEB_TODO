"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config/config");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./graphQL/schema/schema");
const tasks_1 = require("./resolvers/tasks");
const app = (0, express_1.default)();
const port = config_1.PORT;
var root = {
    message: 'Hello World!',
    what: 'eo',
    roll: [1, 2, 3],
    getTask: tasks_1.getTask,
    getUserTasks: tasks_1.getUserTasks
};
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.betterSchema,
    rootValue: root,
    graphiql: true
}));
app.get('/', (req, res) => {
    res.send('super + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
