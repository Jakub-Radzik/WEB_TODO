import { GraphQLBoolean, GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql'

export const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
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
  }
})

export type Task = {
  id: string
  name: string
  done: boolean
  userId: string
}

export type TaskInput = Omit<Task, 'id'>;