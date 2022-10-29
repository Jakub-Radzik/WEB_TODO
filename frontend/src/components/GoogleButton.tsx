import { StyledButton2 } from '../elements/button';
import GoogleIcon from '../assets/google.png';
import {
  GET_GOOGLE_AUTH_URL,
  GoogleAuthUrlResponse,
  GoogleAuthUrlVariables,
} from '../graphQL/queries/google';
import { useQuery } from '@apollo/client';

export const GoogleButton = () => {
  const { data } = useQuery<GoogleAuthUrlResponse, GoogleAuthUrlVariables>(
    GET_GOOGLE_AUTH_URL
  );

  const onClickHandler = () => {
    window.open(data?.googleAuthUrl, '_self');
  };

  return (
    <StyledButton2 style={{ fontSize: 20 }} onClick={onClickHandler}>
      <p style={{ marginRight: 10 }}>Continue with: </p>{' '}
      <img
        src={GoogleIcon}
        style={{
          width: 30,
          height: 30,
        }}
      />
    </StyledButton2>
  );
};
