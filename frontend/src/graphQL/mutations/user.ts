import { gql } from '@apollo/client';

// -----------------------------------
//                      Login Mutation
// -----------------------------------
// Variables
export interface LoginVariables {
  input: {
    login: string;
    password: string;
  };
}

// Response
export interface LoginResponse {
  login: {
    token: string;
    user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    login: string;
  };
  }
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
        login
        email
      }
    }
  }
`;

// -----------------------------------
//                   Register Mutation
// -----------------------------------
// Variables
export interface RegisterVariables {
  input: {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
}

// Response
export interface RegisterResponse {
  register: {
    token: string;
    user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    login: string;
  };
  }
}

// Mutation
export const REGISTER = gql`
mutation Register($input: RegisterInput){
  register(registerInput: $input){
    token
    user {
      _id
      firstName
      lastName
      email
      login
  }
}
}
`;
