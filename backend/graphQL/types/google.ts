import { GraphQLObjectType, GraphQLString } from "graphql";

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