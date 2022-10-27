import { gql } from '@apollo/client';

// -----------------------------------
//        Query to get google auth url
// -----------------------------------
// Variables
export interface GoogleAuthUrlVariables {}

// Response
export interface GoogleAuthUrlResponse {
  googleAuthUrl: string;
}

// Query
export const GET_GOOGLE_AUTH_URL = gql`
  query googleAuthUrl{
    googleAuthUrl
  }
`;

// -----------------------------------
//                 Query to get tokens
// -----------------------------------
// Variables
export interface GoogleTokensVariables {
  code: string;
}

// Response
export interface GoogleTokensResponse {
  googleTokens: {
    access_token: string;
    refresh_token: string;
  };
}

// Query
export const GET_GOOGLE_TOKENS = gql`
  query googleTokens($code: String!){
    googleTokens(code: $code){
        access_token
    }
  }
`;