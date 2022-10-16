import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql'

export const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
  },
})

export type Task = {
  id: string
  name: string
  done: boolean
  userId: string
}
