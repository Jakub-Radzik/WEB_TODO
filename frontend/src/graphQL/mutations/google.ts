import { gql } from '@apollo/client';

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
