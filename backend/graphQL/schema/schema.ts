import { buildSchema, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const schema = buildSchema(`
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

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
    }
  });

const taskType = new GraphQLObjectType({
    name: 'Task',
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
    }
  });

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          userId: { type: GraphQLString }
        },
        resolve: (_, {userId}) => {
          return {
            id: "1",
            name: "Jakub"
          }
        }
      },
      task: {
        type: taskType,
        args: {
          taskId: { type: GraphQLString }
        },
        resolve: (_, {taskId}) => {
          return {
            id: "1",
            name: "Jakub"
          }
        }
      },
    }
  });

  export const betterSchema = new GraphQLSchema({
    query: query,
  })