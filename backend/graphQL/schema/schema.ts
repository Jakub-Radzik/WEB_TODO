import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import { checkGoogleCalendar, getAuthUrl, getGoogleTokens, getTasksFromCalendar } from '../resolvers/google'
import {
  createTask,
  deleteTask,
  duplicateTask,
  getTask,
  getUserTasks,
  updateTask,
} from '../resolvers/tasks'
import { getUser, login, register } from '../resolvers/users'
import { googleEventType } from '../types/events'
import { googleAuthResponseType, GoogleTokensInputType } from '../types/google'
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
      type: googleAuthResponseType,
      args: {
        code : { type: GraphQLString },
      },
      resolve: (_, { code }) => getGoogleTokens(code)
    },
    getTasksFromCalendar: {
      type: new GraphQLList(googleEventType),
      args: {
        tokens: { type: GoogleTokensInputType },
      },
      resolve: (_, {tokens}, context: {
        [key: string]: string;
      }) => getTasksFromCalendar(tokens, context)
    }
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
    },
    checkGoogleCalendar: {
      type: GraphQLString,
      args: {
        tokens: { type: GoogleTokensInputType },
      },
      resolve: (_, {tokens}, context: {
        [key: string]: string;
      }) => checkGoogleCalendar(tokens, context)
    },
  },
})

export const betterSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})
