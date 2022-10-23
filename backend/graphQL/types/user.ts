import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { Document } from 'mongoose'

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
})

export const loginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',  
  fields: {
    token: { type: GraphQLString },
    user: { type: userType },
  }
});

export const registerResponseType = loginResponseType;

export const loginInput = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    login: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export const registerInput = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: {
    firstName: { type: GraphQLString  },
    lastName: { type: GraphQLString },
    login: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    repeatPassword: { type: GraphQLString },
  },
});

export const userInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
  },
})

export interface User extends Document {
  firstName: string
  lastName: string
  login: string
  password: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface LoginInput {
  login: string
  password: string
}

export interface RegisterInput extends LoginInput {
  firstName: string
  lastName: string
  email: string
  repeatPassword: string
}

export type UserInput = Omit<User, '_id'>
