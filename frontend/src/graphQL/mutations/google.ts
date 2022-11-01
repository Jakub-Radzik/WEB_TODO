import { gql } from '@apollo/client';
import { GoogleEventInput } from '../types/event';

// -----------------------------------
//   Verify / Create Calendar Mutation
// -----------------------------------
// Variables
export interface CheckCaledarVariables {
  input: {
    access_token: string;
  };
}

// Response
export interface CheckCaledarResponse {
  checkGoogleCalendar: string;
}

// Mutation
export const CHECK_CALENDAR = gql`
  mutation check($input: GoogleTokensInput) {
    checkGoogleCalendar(tokens: $input)
  }
`;

// -----------------------------------
//          Create Event Task Mutation
// -----------------------------------
// Variables
export interface CreateEventVariables {
  input: {
    access_token: string;
  },
  event: GoogleEventInput
}

// Response
export interface CreateEventResponse {
  checkGoogleCalendar: string;
}

// Mutation
export const CREATE_EVENT = gql`
  mutation createEvent($input: GoogleTokensInput, $event: GoogleInputEvent) {
    createEvent(tokens: $input, event: $event) {
      id
      kind
      status
      htmlLink
      created
      updated
      summary
      description
      hangoutLink
      colorId
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
