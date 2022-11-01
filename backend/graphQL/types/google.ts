import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";
import { User, userType } from "../types/user";

export const credentialsType = new GraphQLObjectType({
    name: 'Credentials',
    fields: {
    refresh_token: { type: GraphQLString },
    access_token: { type: GraphQLString },
    token_type: { type: GraphQLString },
    id_token: { type: GraphQLString },
    scope: { type: GraphQLString },
    },
  })

export const googleAuthResponseType = new GraphQLObjectType({
  name: 'GoogleAuth',
  fields:{
    user: { type: userType },
    token: {type: GraphQLString},
    tokens: {type: credentialsType},    
  }
})

export interface Credentials {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
}
export interface GoogleAuthResponse {
  token: string
  user: User
  tokens: Credentials
}

export const GoogleTokensInputType = new GraphQLInputObjectType({
  name: 'GoogleTokensInput',
  fields: {
    access_token: { type: GraphQLString },
    // refresh_token: { type: GraphQLString },
  }
});

export interface GoogleTokensInput {
  access_token: string
  // refresh_token: string
}


