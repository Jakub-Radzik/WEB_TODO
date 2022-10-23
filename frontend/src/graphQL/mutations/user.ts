import { gql } from '@apollo/client';

// -----------------------------------
//                      Login Mutation
// -----------------------------------
// Variables
export interface LoginVariables {
  login: string;
  password: string;
}

// Response
export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Mutation
export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(loginInput: $input) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;
