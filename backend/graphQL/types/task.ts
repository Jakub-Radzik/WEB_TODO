import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { Document } from 'mongoose'

export const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    color: { type: GraphQLString },
    fontColor: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
})

export const taskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    color: { type: GraphQLString },
    fontColor: { type: GraphQLString },
  },
})

export interface Task extends Document {
  title: string
  color: string
  fontColor: string
  content: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface TaskInput {
  title: string
  color: string
  fontColor: string
  content: string
}
