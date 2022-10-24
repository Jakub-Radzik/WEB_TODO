"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betterSchema = exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
    type Task {
        _id: String!
        name: String
    }

    type Query {
        message: String
        what: String
        roll: [Int]
        getTask(id: String!): Task
        getUserTasks(userId: String!): [Task]
    }
`);
const userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }
});
const taskType = new graphql_1.GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }
});
const query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                userId: { type: graphql_1.GraphQLString }
            },
            resolve: (_, { userId }) => {
                return {
                    id: "1",
                    name: "Jakub"
                };
            }
        },
        task: {
            type: taskType,
            args: {
                taskId: { type: graphql_1.GraphQLString }
            },
            resolve: (_, { taskId }) => {
                return {
                    id: "1",
                    name: "Jakub"
                };
            }
        },
    }
});
exports.betterSchema = new graphql_1.GraphQLSchema({
    query: query,
});
