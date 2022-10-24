import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import { getAuthUrl, getGoogleTokens } from '../resolvers/google'
import {
  createTask,
  deleteTask,
  duplicateTask,
  getTask,
  getUserTasks,
  updateTask,
} from '../resolvers/tasks'
import { getUser, login, register } from '../resolvers/users'
import { credentialsType } from '../types/google'
import { taskInput, taskType } from '../types/task'
import { loginInput, loginResponseType, registerInput, registerResponseType, userType } from '../types/user'

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: (_, { userId }) => getUser(userId),
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
      resolve: (_, {}, context: {
        [key: string]: string;
      }) => getUserTasks(context),
    },
    googleAuthUrl: {
      type: GraphQLString,
      resolve: () => getAuthUrl(),
    },
    googleTokens: {
      type: credentialsType,
      args: {
        code : { type: GraphQLString },
      },
      resolve: (_, { code }) => getGoogleTokens(code),
    },
  },
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: taskType,
      args: {
        task: { type: taskInput },
      },
      resolve: (_, { task }) => createTask(task),
    },
    updateTask: {
      type: taskType,
      args: {
        taskId: { type: GraphQLString },
        task: { type: taskInput },
      },
      resolve: (_, { taskId, task }) => updateTask(taskId, task),
    },
    deleteTask: {
      type: taskType,
      args: {
        taskId: { type: GraphQLString },
      },
      resolve: (_, { taskId }) => deleteTask(taskId),
    },
    duplicateTask: {
      type: taskType,
      args: {
        taskId: {type: GraphQLString},
      },
      resolve: (_, {taskId}) => duplicateTask(taskId),
    },
    login: {
      type: loginResponseType,
      args: {
        loginInput: { type: loginInput },
      },
      resolve: (_, {loginInput}) => login(loginInput),
    },
    register: {
      type: registerResponseType,
      args: {
        registerInput: { type: registerInput },
      },
      resolve: (_, {registerInput}) => register(registerInput),
    }
  },
})

export const betterSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})
