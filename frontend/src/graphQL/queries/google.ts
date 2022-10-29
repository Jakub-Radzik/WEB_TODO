import { gql } from '@apollo/client';
import { GoogleEvent } from '../types/event';

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
  query googleAuthUrl {
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
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    token: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      login: string;
      email: string;
    };
  };
}

// Query
export const GET_GOOGLE_TOKENS = gql`
  query googleTokens($code: String!) {
    googleTokens(code: $code) {
      tokens {
        access_token
        refresh_token
      }
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
//         Query to get calendar tasks
// -----------------------------------
// Variables
export interface GetCalendarTasksVariables {
  input: {
    access_token: string;
    // refresh_token: string
  };
}

// Response
export interface GetCalendarTasksResponse {
  getTasksFromCalendar: GoogleEvent[];
}

// Query
export const GET_CALENDAR_TASKS = gql`
  query getCalendarTasks($input: GoogleTokensInput) {
    getTasksFromCalendar(tokens: $input) {
      id
      kind
      status
      htmlLink
      created
      updated
      summary
      description
      hangoutLink
      creator {
        email
      }
      organizer {
        email
        displayName
        self
      }
      start {
        date
        dateTime
        timeZone
      }
      end {
        date
        dateTime
        timeZone
      }
    }
  }
`;
