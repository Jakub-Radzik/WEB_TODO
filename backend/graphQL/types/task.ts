import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { Types, Document } from 'mongoose'

export const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
  },
})

export const taskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
    name: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
  },
})

export interface Task extends Document {
  name: string
  done: boolean
  userId: string
}

export type TaskInput = Omit<Task, '_id'>
