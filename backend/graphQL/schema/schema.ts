import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import { createTask, getTask, getUserTasks } from '../resolvers/tasks'
import { taskInput, taskType } from '../types/task'
import { userType } from '../types/user'

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: (_, { userId }) => {
        return {
          id: '1',
          name: 'Jakub',
        }
      },
    },
    task: {
      type: taskType,
      args: {
        taskId: { type: GraphQLString },
      },
      resolve: (_, { taskId }) => getTask(taskId),
    },
    userTasks: {
      type: new GraphQLList(taskType),
      args: {
        userId: { type: GraphQLString },
      },
      resolve: (_, { userId }) => getUserTasks(userId),
    },
  },
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: taskType,
      args: {
        task: { type: taskInput},
      },
      resolve: (_, { task }) => createTask(task),
    },
  },
});

export const betterSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

